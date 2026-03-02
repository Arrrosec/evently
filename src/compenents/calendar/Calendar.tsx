// src/components/calendar/Calendar.tsx
import { useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "../events/EventModal";
import EventList from "../events/EventList";
import type { CalendarEvent, EventCategory } from "../../types/Event";

interface Props {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

export default function Calendar({ events, setEvents }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [filterCategory, setFilterCategory] = useState<EventCategory | "all">("all");

  // Filter + map events for FullCalendar
  const fullCalendarEvents = useMemo(() => {
    return events
      .filter((e) => filterCategory === "all" || e.category === filterCategory)
      .map((e) => ({
        id: e.id,
        title: e.title,
        start: e.date,
        allDay: true,
        extendedProps: { category: e.category },
      }));
  }, [events, filterCategory]);

  // Filter + sort upcoming events for the EventList
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
      .filter(
        (e) =>
          (filterCategory === "all" || e.category === filterCategory) &&
          new Date(e.date).setHours(0, 0, 0, 0) >= today.getTime()
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, filterCategory]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setEditingEvent(null); // new event
  };

  const handleEventClick = (arg: any) => {
    const clickedEvent = events.find((e) => e.id === arg.event.id);
    if (clickedEvent) {
      setEditingEvent(clickedEvent);
      setSelectedDate(clickedEvent.date);
    }
  };

  const handleSave = (event: CalendarEvent) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.id === event.id);
      if (exists) {
        return prev.map((e) => (e.id === event.id ? event : e));
      }
      return [...prev, event];
    });
    setSelectedDate(null);
    setEditingEvent(null);
  };

  const handleDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setSelectedDate(null);
    setEditingEvent(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Calendar Section */}
      <div className="flex-1 bg-white shadow-xl rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <label className="font-medium">Filter by category:</label>
          <select
            className="border p-1 rounded"
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(e.target.value as EventCategory | "all")
            }
          >
            <option value="all">All</option>
            <option value="meeting">Meeting</option>
            <option value="conference">Conference</option>
            <option value="reminder">Reminder</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={fullCalendarEvents}
          selectable={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
          eventDidMount={(info) => {
            const category = info.event.extendedProps.category;
            if (category === "meeting") info.el.classList.add("bg-blue-500", "text-white");
            else if (category === "conference") info.el.classList.add("bg-green-500", "text-white");
            else if (category === "reminder") info.el.classList.add("bg-yellow-400", "text-black");
            else if (category === "personal") info.el.classList.add("bg-purple-500", "text-white");
          }}
        />

        {selectedDate && (
          <EventModal
            selectedDate={selectedDate}
            editingEvent={editingEvent}
            onClose={() => {
              setSelectedDate(null);
              setEditingEvent(null);
            }}
            onSave={handleSave}
            onDelete={editingEvent ? () => handleDelete(editingEvent.id) : undefined}
          />
        )}
      </div>

      {/* Upcoming Events List */}
      <EventList
        events={upcomingEvents}
        onEdit={(event) => {
          setEditingEvent(event);
          setSelectedDate(event.date);
        }}
        onDelete={(id) => handleDelete(id)}
      />
    </div>
  );
}
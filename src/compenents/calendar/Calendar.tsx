import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "../events/EventModal";
import type { CalendarEvent } from "../../types/Event";

interface Props {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

export default function Calendar({ events, setEvents }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const fullCalendarEvents: any[] = events.map((e) => {
    let bgColor = "";
    let textColor = "#ffffff";

    switch (e.category) {
      case "meeting": bgColor = "#3B82F6"; break;
      case "conference": bgColor = "#10B981"; break;
      case "reminder": bgColor = "#FBBF24"; textColor="#000"; break;
      case "personal": bgColor = "#8B5CF6"; break;
      default: bgColor = "#3B82F6";
    }

    return {
      id: e.id,
      title: e.title,
      start: e.date,
      allDay: true,
      backgroundColor: bgColor,
      textColor: textColor,
      extendedProps: { category: e.category },
    };
  });

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setEditingEvent(null); // new event
  };

  const handleEventClick = (arg: any) => {
    const clickedEvent = events.find(e => e.id === arg.event.id);
    if (!clickedEvent) return;
    setEditingEvent(clickedEvent);
    setSelectedDate(clickedEvent.date);
  };

  const handleSave = (event: CalendarEvent) => {
    if (editingEvent) {
      // update existing
      setEvents(prev => prev.map(e => e.id === event.id ? event : e));
    } else {
      // add new
      setEvents(prev => [...prev, event]);
    }
    setSelectedDate(null);
    setEditingEvent(null);
  };

  const handleDelete = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setSelectedDate(null);
    setEditingEvent(null);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl mx-auto">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={fullCalendarEvents}
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />

      {selectedDate && (
        <EventModal
          selectedDate={selectedDate}
          onClose={() => { setSelectedDate(null); setEditingEvent(null); }}
          onSave={handleSave}
          onDelete={editingEvent ? () => handleDelete(editingEvent.id) : undefined}
          editingEvent={editingEvent}
        />
      )}
    </div>
  );
}
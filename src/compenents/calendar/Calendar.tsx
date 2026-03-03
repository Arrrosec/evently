// src/components/calendar/Calendar.tsx
import { useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "../events/EventModal";
import EventList from "../events/EventList";
import type { CalendarEvent, EventCategory } from "../../types/Event";

interface Props {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  filterCategory: EventCategory | "all";
  addEventDate?: string | null;
  onAddEventClose?: () => void;
}

// Left-border accent style
const CATEGORY_COLORS: Record<string, { accent: string; bg: string; text: string }> = {
  meeting:    { accent: "#3b82f6", bg: "#eff6ff", text: "#1e40af" },
  conference: { accent: "#22c55e", bg: "#f0fdf4", text: "#15803d" },
  reminder:   { accent: "#f59e0b", bg: "#fffbeb", text: "#92400e" },
  personal:   { accent: "#a855f7", bg: "#faf5ff", text: "#6b21a8" },
};

export default function Calendar({
  events,
  setEvents,
  filterCategory,
  addEventDate,
  onAddEventClose,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    if (addEventDate) {
      setSelectedDate(addEventDate);
      setEditingEvent(null);
    }
  }, [addEventDate]);

  const fullCalendarEvents = useMemo(() => {
    return events
      .filter((e) => filterCategory === "all" || e.category === filterCategory)
      .map((e) => {
        const c = CATEGORY_COLORS[e.category] ?? { accent: "#94a3b8", bg: "#f8fafc", text: "#334155" };
        return {
          id: e.id,
          title: e.title,
          start: e.date,
          allDay: true,
          backgroundColor: c.bg,
          borderColor: c.bg,
          textColor: c.text,
          extendedProps: { accent: c.accent },
        };
      });
  }, [events, filterCategory]);

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
    setEditingEvent(null);
  };

  const handleEventClick = (arg: any) => {
    const clickedEvent = events.find((e) => e.id === arg.event.id);
    if (clickedEvent) {
      setEditingEvent(clickedEvent);
      setSelectedDate(clickedEvent.date);
    }
  };

  const handleClose = () => {
    setSelectedDate(null);
    setEditingEvent(null);
    onAddEventClose?.();
  };

  const handleSave = (event: CalendarEvent) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.id === event.id);
      if (exists) return prev.map((e) => (e.id === event.id ? event : e));
      return [...prev, event];
    });
    handleClose();
  };

  const handleDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    handleClose();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Calendar */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 min-w-0">
        <div className="h-[600px] overflow-y-auto">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={fullCalendarEvents}
            selectable={true}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="auto"
            eventDidMount={(info) => {
              const accent = info.event.extendedProps.accent;
              info.el.style.borderLeft = `3px solid ${accent}`;
              info.el.style.borderRadius = "5px";
              info.el.style.fontSize = "0.75rem";
              info.el.style.padding = "1px 5px";
            }}
          />
        </div>

        {selectedDate && (
          <EventModal
            selectedDate={selectedDate}
            editingEvent={editingEvent}
            onClose={handleClose}
            onSave={handleSave}
            onDelete={editingEvent ? () => handleDelete(editingEvent.id) : undefined}
          />
        )}
      </div>

      {/* Upcoming Events */}
      <div className="w-full md:w-72 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4 shrink-0">
          Upcoming
        </h2>
        <div className="overflow-y-auto flex-1 max-h-[540px] space-y-2 pr-1">
          <EventList
            events={upcomingEvents}
            onEdit={(event) => {
              setEditingEvent(event);
              setSelectedDate(event.date);
            }}
            onDelete={(id) => handleDelete(id)}
          />
        </div>
      </div>
    </div>
  );
}
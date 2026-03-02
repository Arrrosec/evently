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

const fullCalendarEvents: any[] = events.map((e) => {
  let bgColor = "";
  let textColor = "#ffffff";

  switch (e.category) {
    case "meeting":
      bgColor = "#3B82F6"; // blue
      break;
    case "conference":
      bgColor = "#10B981"; // green
      break;
    case "reminder":
      bgColor = "#FBBF24"; // yellow
      textColor = "#000000";
      break;
    case "personal":
      bgColor = "#8B5CF6"; // purple
      break;
    default:
      bgColor = "#3B82F6"; // fallback blue
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
  };

  const handleEventClick = (arg: any) => {
    alert(`Clicked event: ${arg.event.title}`);
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
          onClose={() => setSelectedDate(null)}
          onSave={(event) => setEvents((prev) => [...prev, event])}
        />
      )}
    </div>
  );
}

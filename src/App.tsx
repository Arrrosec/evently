import { useState } from "react";
import Calendar from "./compenents/calendar/Calendar";
import type {  CalendarEvent } from "./types/Event";

export default function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Calendar events={events} setEvents={setEvents} />
    </div>
  );
}

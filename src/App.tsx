import { useState } from "react";
import Calendar from "./compenents/calendar/Calendar";// fix typo: "compenents" → "components"
import type { CalendarEvent } from "./types/Event";

export default function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        {/* Calendar handles everything including Upcoming Events */}
        <Calendar events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}
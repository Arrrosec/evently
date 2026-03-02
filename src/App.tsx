import { useState } from "react";
import Calendar from "./compenents/calendar/Calendar";
import EventList from "./compenents/events/EventList";
import type { CalendarEvent } from "./types/Event";

export default function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        {/* Calendar takes majority of width */}
        <div className="flex-1">
          <Calendar events={events} setEvents={setEvents} />
        </div>

        {/* Event list sidebar */}
        <div className="w-full lg:w-80">
          <EventList events={events} />
        </div>
      </div>
    </div>
  );
}
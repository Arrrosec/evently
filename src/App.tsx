// src/App.tsx
import { useState } from "react";
import Calendar from "./compenents/calendar/Calendar";
import type { CalendarEvent, EventCategory } from "./types/Event";
import { mockEvents } from "./compenents/data/mockEvents";

const CATEGORIES: { value: EventCategory | "all"; label: string; dot?: string }[] = [
  { value: "all",        label: "All" },
  { value: "meeting",    label: "Meeting",    dot: "bg-blue-500" },
  { value: "conference", label: "Conference", dot: "bg-green-500" },
  { value: "reminder",   label: "Reminder",   dot: "bg-yellow-400" },
  { value: "personal",   label: "Personal",   dot: "bg-purple-500" },
];

export default function App() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [filterCategory, setFilterCategory] = useState<EventCategory | "all">("all");
  const [addEventDate, setAddEventDate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Event Manager</h1>
          </div>
          <p className="text-sm text-slate-400">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="w-full bg-white border-b border-slate-200 px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {CATEGORIES.map(({ value, label, dot }) => (
              <button
                key={value}
                onClick={() => setFilterCategory(value)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm transition-all
                  ${filterCategory === value
                    ? "bg-white text-amber-500 font-medium shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {dot && <span className={`w-2 h-2 rounded-full ${dot}`} />}
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setAddEventDate(new Date().toISOString().split("T")[0])}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white font-medium text-sm rounded-xl transition-all"
          >
            + New Event
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-8">
        <Calendar
          events={events}
          setEvents={setEvents}
          filterCategory={filterCategory}
          addEventDate={addEventDate}
          onAddEventClose={() => setAddEventDate(null)}
        />
      </div>

    </div>
  );
}
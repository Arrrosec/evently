// src/components/events/EventList.tsx
import type { CalendarEvent } from "../../types/Event";

interface Props {
  events: CalendarEvent[];
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
}

const CATEGORY_STYLE: Record<string, { accent: string; label: string }> = {
  meeting:    { accent: "#3b82f6", label: "Meeting" },
  conference: { accent: "#22c55e", label: "Conference" },
  reminder:   { accent: "#f59e0b", label: "Reminder" },
  personal:   { accent: "#a855f7", label: "Personal" },
};

export default function EventList({ events, onEdit, onDelete }: Props) {
  if (events.length === 0) {
    return <p className="text-sm text-slate-400 text-center py-8">No upcoming events</p>;
  }

  return (
    <ul className="space-y-2">
      {events.map((event) => {
        const style = CATEGORY_STYLE[event.category] ?? { accent: "#94a3b8", label: event.category };
        return (
          <li
            key={event.id}
            className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all group"
            style={{ borderLeft: `3px solid ${style.accent}` }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{event.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" })}
              </p>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              {onEdit && (
                <button
                  onClick={() => onEdit(event)}
                  className="px-2 py-1 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(event.id)}
                  className="px-2 py-1 text-xs text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
// src/components/events/EventList.tsx
import type { CalendarEvent } from "../../types/Event";

interface Props {
  events: CalendarEvent[];
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
}

export default function EventList({ events, onEdit, onDelete }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to start of today

  // Filter upcoming events and sort by date
  const upcomingEvents = [...events]
    .filter((e) => new Date(e.date).setHours(0, 0, 0, 0) >= today.getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
      <ul className="space-y-2">
        {upcomingEvents.map((event) => (
          <li
            key={event.id}
            className={`p-2 rounded flex justify-between items-center
              ${
                event.category === "meeting"
                  ? "bg-blue-100"
                  : event.category === "conference"
                  ? "bg-green-100"
                  : event.category === "reminder"
                  ? "bg-yellow-100"
                  : "bg-purple-100"
              }`}
          >
            <div>
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm">
                {new Date(event.date).toLocaleDateString()} | {event.location}
              </p>
            </div>

            <div className="flex gap-1">
              {onEdit && (
                <button
                  onClick={() => onEdit(event)}
                  className="px-2 py-1 text-white bg-blue-500 rounded text-sm"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(event.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
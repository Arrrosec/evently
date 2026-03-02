import type { CalendarEvent } from "../../types/Event";

interface Props {
  events: CalendarEvent[];
}

export default function EventList({ events }: Props) {
  // Sort soonest first
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className=" p-4 bg-white shadow rounded-xl max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
      {sortedEvents.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <ul className="space-y-2">
          {sortedEvents.map((e) => (
            <li
              key={e.id}
              className="flex justify-between border-b pb-1"
            >
              <span>{e.title}</span>
              <span className="text-gray-500">
                {new Date(e.date).toLocaleDateString()} | {e.category}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
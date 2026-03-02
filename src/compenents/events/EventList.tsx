import type { CalendarEvent } from "../../types/Event";

interface Props {
  events: CalendarEvent[];
}

export default function EventList({ events }: Props) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "meeting":
        return "bg-blue-500";
      case "conference":
        return "bg-green-500";
      case "reminder":
        return "bg-yellow-400";
      case "personal":
        return "bg-purple-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className=" p-4 bg-white shadow rounded-xl">
      <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
      {sortedEvents.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <ul className="space-y-2">
          {sortedEvents.map((e) => (
            <li
              key={e.id}
              className="flex justify-between items-center border-b pb-1"
            >
              <div className="flex items-center gap-2">
                {/* Colored badge */}
                <span
                  className={`w-3 h-3 rounded-full ${getCategoryColor(
                    e.category
                  )}`}
                ></span>
                <span>{e.title}</span>
              </div>
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
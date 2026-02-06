import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CalendarEvent } from "../../types/Event";

interface Props {
  day: Dayjs;
  events: CalendarEvent[];
  onClick: () => void;
}

export default function DayCell({ day, events, onClick }: Props) {
  const isToday = day.isSame(dayjs(), "day");

  const dayEvents = events.filter((e) =>
    dayjs(e.date).isSame(day, "day")
  );

  return (
    <div
      onClick={onClick}
      className={`h-20 border rounded-lg p-2 cursor-pointer transition
        ${isToday ? "bg-blue-100 border-blue-400" : "hover:bg-gray-50"}`}
    >
      <p className="text-sm font-medium">{day.format("D")}</p>

      {/* Event dots */}
      <div className="flex gap-1 mt-1">
        {dayEvents.map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

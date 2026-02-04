import dayjs, { Dayjs } from "dayjs";

interface Props {
  day: Dayjs;
}

export default function DayCell({ day }: Props) {
  const isToday = day.isSame(dayjs(), "day");

  return (
    <div
      className={`h-20 border rounded-lg p-2 cursor-pointer transition
      ${isToday ? "bg-blue-100 border-blue-400" : "hover:bg-gray-50"}`}
    >
      <p className="text-sm font-medium">{day.format("D")}</p>
    </div>
  );
}

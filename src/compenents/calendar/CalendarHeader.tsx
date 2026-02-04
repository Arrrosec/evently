import { Dayjs } from "dayjs";

interface Props {
  currentMonth: Dayjs;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Dayjs>>;
}

export default function CalendarHeader({
  currentMonth,
  setCurrentMonth,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
      >
        ←
      </button>

      <h2 className="text-xl font-semibold">
        {currentMonth.format("MMMM YYYY")}
      </h2>

      <button
        onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
        className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
      >
        →
      </button>
    </div>
  );
}

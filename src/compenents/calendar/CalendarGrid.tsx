// src/components/calendar/CalendarGrid.tsx
import { Dayjs } from "dayjs";
import DayCell from "./DayCell";

interface Props {
  currentMonth: Dayjs;
}

export default function CalendarGrid({ currentMonth }: Props) {
  const startOfMonth = currentMonth.startOf("month");
  const daysInMonth = currentMonth.daysInMonth();

  const days: Dayjs[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(startOfMonth.date(i));
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <DayCell key={day.format("DD-MM-YYYY")} day={day} />
      ))}
    </div>
  );
}

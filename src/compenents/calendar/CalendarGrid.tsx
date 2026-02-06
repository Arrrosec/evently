// src/components/calendar/CalendarGrid.tsx
import { Dayjs } from "dayjs";
import DayCell from "./DayCell";
import type{ CalendarEvent } from "../../types/Event";
interface Props {
  currentMonth: Dayjs;
  events: CalendarEvent[];
  onDayClick: (date: string) => void;
}


export default function CalendarGrid({
  currentMonth,
  events,
  onDayClick,
}: Props) {

  const startOfMonth = currentMonth.startOf("month");
  const daysInMonth = currentMonth.daysInMonth();

  const days: Dayjs[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(startOfMonth.date(i));
  }

 return (
  <div className="grid grid-cols-7 gap-2">
    {days.map((day) => (
      <DayCell
        key={day.format("DD-MM-YYYY")}
        day={day}
        events={events}
        onClick={() => onDayClick(day.toISOString())}
      />
    ))}
  </div>
);

}

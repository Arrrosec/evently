// src/components/calendar/Calendar.tsx
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
// Calendar.tsx
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl mx-auto">
      <CalendarHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <CalendarGrid currentMonth={currentMonth} />
    </div>
  );
}

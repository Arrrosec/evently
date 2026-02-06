import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventModal from "../events/EventModal";
import type{ CalendarEvent } from "../../types/Event";

interface Props {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

export default function Calendar({ events, setEvents }: Props) {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl mx-auto">
      <CalendarHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <CalendarGrid
        currentMonth={currentMonth}
        events={events}
        onDayClick={(date) => setSelectedDate(date)}
      />

      {selectedDate && (
        <EventModal
          selectedDate={selectedDate}
          onClose={() => setSelectedDate(null)}
          onSave={(event) =>
            setEvents((prev) => [...prev, event])
          }
        />
      )}
    </div>
  );
}

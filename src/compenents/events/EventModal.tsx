import { useState } from "react";
import type{ CalendarEvent, EventCategory } from "../../types/Event";

interface Props {
  selectedDate: string;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
}

export default function EventModal({ selectedDate, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EventCategory>("meeting");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSave({
      id: crypto.randomUUID(),
      title,
      date: selectedDate,
      category,
      location,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96 space-y-4 shadow-xl">
        <h2 className="text-lg font-semibold">Add Event</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value as EventCategory)}
        >
          <option value="meeting">Meeting</option>
          <option value="conference">Conference</option>
          <option value="reminder">Reminder</option>
          <option value="personal">Personal</option>
        </select>

        <input
          className="w-full border p-2 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

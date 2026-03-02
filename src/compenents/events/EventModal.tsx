// src/components/events/EventModal.tsx
import { useState, useEffect } from "react";
import type { CalendarEvent, EventCategory } from "../../types/Event";

interface Props {
  selectedDate: string; // read-only, passed from parent
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: () => void;
  editingEvent?: CalendarEvent | null;
}

export default function EventModal({
  selectedDate,
  onClose,
  onSave,
  onDelete,
  editingEvent,
}: Props) {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<EventCategory>("meeting");
  const [location, setLocation] = useState<string>("");

  // pre-fill fields if editing
useEffect(() => {
  setTitle(editingEvent?.title || "");
  setCategory(editingEvent?.category || "meeting");
  setLocation(editingEvent?.location || "");
}, [editingEvent]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const event: CalendarEvent = {
      id: editingEvent ? editingEvent.id : crypto.randomUUID(),
      title,
      date: selectedDate, // ✅ read-only from parent
      category,
      location,
    };

    onSave(event);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-96 space-y-4 shadow-xl z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">
          {editingEvent ? "Edit Event" : "Add Event"}
        </h2>

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

        <div className="flex justify-between gap-2">
          {editingEvent && onDelete && (
            <button
              onClick={onDelete}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          )}
          <div className="ml-auto flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
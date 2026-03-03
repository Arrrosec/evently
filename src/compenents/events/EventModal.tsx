// src/components/events/EventModal.tsx
import { useState, useEffect } from "react";
import type { CalendarEvent, EventCategory } from "../../types/Event";

interface Props {
  selectedDate: string;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: () => void;
  editingEvent?: CalendarEvent | null;
}

const CATEGORIES: { value: EventCategory; label: string; accent: string }[] = [
  { value: "meeting",    label: "Meeting",    accent: "#3b82f6" },
  { value: "conference", label: "Conference", accent: "#22c55e" },
  { value: "reminder",   label: "Reminder",   accent: "#f59e0b" },
  { value: "personal",   label: "Personal",   accent: "#a855f7" },
];

export default function EventModal({ selectedDate, onClose, onSave, onDelete, editingEvent }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EventCategory>("meeting");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setTitle(editingEvent?.title || "");
    setCategory(editingEvent?.category || "meeting");
    setLocation(editingEvent?.location || "");
  }, [editingEvent]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave({
      id: editingEvent?.id ?? crypto.randomUUID(),
      title,
      date: selectedDate,
      category,
      location,
    });
  };

  const displayDate = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-500 mb-0.5">
              {editingEvent ? "Edit Event" : "New Event"}
            </p>
            <p className="text-sm text-slate-400">{displayDate}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Title */}
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5 block">Title</label>
            <input
              autoFocus
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
              placeholder="Event name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5 block">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                    category === cat.value
                      ? "text-white border-transparent"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                  }`}
                  style={category === cat.value ? { background: cat.accent, borderColor: cat.accent } : {}}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5 block">Location <span className="normal-case text-slate-300">(optional)</span></label>
            <input
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
              placeholder="Add a location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 pb-6 gap-3">
          {editingEvent && onDelete ? (
            <button onClick={onDelete} className="px-4 py-2 text-sm text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
              Delete
            </button>
          ) : <div />}

          <div className="flex gap-2">
        
            <button
              onClick={handleSubmit}
              disabled={!title.trim()}
              className="px-5 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all"
            >
              {editingEvent ? "Save changes" : "Create event"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
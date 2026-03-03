// src/data/mockEvents.ts
import type { CalendarEvent } from "../../types/Event";

const today = new Date();
const fmt = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
};

export const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Standup",
    date: fmt(0),
    category: "meeting",
    location: "Room A",
  },
  {
    id: "2",
    title: "React Summit 2026",
    date: fmt(3),
    category: "conference",
    location: "Room B",
  },
  {
    id: "3",
    title: "Pay electricity bill",
    date: fmt(5),
    category: "reminder",
    location: "Room C",
  },
  {
    id: "4",
    title: "Dentist appointment",
    date: fmt(7),
    category: "personal",
    location: "Room D",
  },
  {
    id: "5",
    title: "Q2 Planning Meeting",
    date: fmt(10),
    category: "meeting",
    location: "Room E",
  },
  {
    id: "6",
    title: "Design Workshop",
    date: fmt(12),
    category: "conference",
    location: "Room F",
  },
  {
    id: "7",
    title: "Gym session",
    date: fmt(1),
    category: "personal",
    location: "Room D",
  },
  {
    id: "8",
    title: "Submit expense report",
    date: fmt(2),
    category: "reminder",
    location: "Room H",
  },
];
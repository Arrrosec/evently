export type EventCategory =
  | "meeting"
  | "conference"
  | "reminder"
  | "personal";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO string
  category: EventCategory;
  location?: string;
}

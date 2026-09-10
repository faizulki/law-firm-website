/**
 * Booking abstraction.
 *
 * The consultation form talks to a `BookingProvider` interface rather than any
 * specific backend. `ApiBookingProvider` talks to the server-side booking
 * store (src/lib/bookings-store.ts, via /api/bookings), which enforces one
 * booking per date+time slot. To go live against a real scheduling backend
 * (Calendly, Google Calendar, Microsoft Bookings), implement this same
 * interface and swap the export at the bottom — no UI changes required.
 */

import type { Lang } from "./dictionary";

/** Stable, language-independent id for the consultation format. */
export type ConsultationType = "personal" | "video" | "phone";

export const CONSULTATION_TYPE_IDS: ConsultationType[] = [
  "personal",
  "video",
  "phone",
];

export type BookingInput = {
  serviceAreaSlug: string;
  serviceArea: string; // resolved label at submit time (for the record)
  consultationType: ConsultationType;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Visitor's active site language at booking time — used to pick the confirmation email's language. */
  lang: Lang;
};

export type Booking = BookingInput & {
  id: string;
  createdAt: string; // ISO timestamp
  status: "pending";
};

export interface BookingProvider {
  createBooking(input: BookingInput): Promise<Booking>;
  listBookings(): Promise<Booking[]>;
}

/** Thrown by ApiBookingProvider when the API rejects the booking; `code` matches the API's error field. */
export class BookingError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "BookingError";
    this.code = code;
  }
}

class ApiBookingProvider implements BookingProvider {
  async createBooking(input: BookingInput): Promise<Booking> {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new BookingError(
        typeof data.error === "string" ? data.error : "server_error",
        "Could not create booking"
      );
    }
    return data as Booking;
  }

  async listBookings(): Promise<Booking[]> {
    // Not exposed publicly — booking records include client PII (name,
    // email, phone), so there's no public "list all bookings" endpoint.
    return [];
  }
}

/** The active provider. Swap this line to integrate a real scheduling backend. */
export const bookingProvider: BookingProvider = new ApiBookingProvider();

/** Already-booked times for a date, so the UI can grey them out before submit. */
export async function getBookedTimes(date: string): Promise<string[]> {
  try {
    const res = await fetch(`/api/bookings?date=${encodeURIComponent(date)}`);
    if (!res.ok) return [];
    const data = await res.json().catch(() => ({}));
    return Array.isArray(data.bookedTimes) ? data.bookedTimes : [];
  } catch {
    return [];
  }
}

/** Available appointment time slots (fixed daily schedule). */
export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
] as const;

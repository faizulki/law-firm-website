/**
 * Booking abstraction.
 *
 * The consultation form talks to a `BookingProvider` interface rather than any
 * specific backend. The demo ships a `LocalStorageBookingProvider` that persists
 * submissions in the browser. To go live, implement this same interface against
 * Calendly, Google Calendar, or Microsoft Bookings and swap the export at the
 * bottom — no UI changes required.
 *
 * Example future provider:
 *
 *   class CalendlyProvider implements BookingProvider {
 *     async createBooking(input) {
 *       const res = await fetch("/api/calendly", { method: "POST", body: ... });
 *       return res.json();
 *     }
 *   }
 *   export const bookingProvider: BookingProvider = new CalendlyProvider();
 */

/** Stable, language-independent id for the consultation format. */
export type ConsultationType = "personal" | "video" | "phone";

export const CONSULTATION_TYPE_IDS: ConsultationType[] = [
  "personal",
  "video",
  "phone",
];

export type BookingInput = {
  serviceAreaSlug: string;
  serviceArea: string; // resolved label at submit time (for the demo record)
  consultationType: ConsultationType;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
  name: string;
  email: string;
  phone: string;
  message: string;
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

const STORAGE_KEY = "invictus_bookings";

/** Demo provider — persists bookings to localStorage. */
class LocalStorageBookingProvider implements BookingProvider {
  async createBooking(input: BookingInput): Promise<Booking> {
    const booking: Booking = {
      ...input,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    // Simulate a brief network round-trip so the UI feels real.
    await new Promise((resolve) => setTimeout(resolve, 700));

    const existing = await this.listBookings();
    this.persist([booking, ...existing]);
    return booking;
  }

  async listBookings(): Promise<Booking[]> {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Booking[]) : [];
    } catch {
      return [];
    }
  }

  private persist(bookings: Booking[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }

  private generateId(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `bk_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  }
}

/** The active provider. Swap this line to integrate a real scheduling backend. */
export const bookingProvider: BookingProvider = new LocalStorageBookingProvider();

/** Available appointment time slots (local demo schedule). */
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


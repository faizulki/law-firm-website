import fs from "node:fs";
import path from "node:path";
import { TIME_SLOTS, type Booking, type BookingInput } from "./booking";
import { isDateBlocked, getBlockedTimesForDate } from "./availability-store";

/**
 * Server-side booking store, file-backed on the persisted Docker volume
 * (same pattern as articles.ts / content-store.ts). Enforces one booking
 * per date+time slot — the previous LocalStorageBookingProvider had no
 * shared state at all, so nothing stopped the same slot being booked
 * repeatedly.
 *
 * Concurrency note: createBooking reads, checks, and writes synchronously
 * with no `await` in between, so within this single Node process the
 * check-then-write is atomic (the event loop can't interleave another
 * request's handler in the middle of a synchronous call). That's
 * sufficient for a single-instance deployment like this one.
 */

const DATA_PATH =
  process.env.BOOKINGS_DATA_PATH ??
  path.join(/*turbopackIgnore: true*/ process.cwd(), "data", "bookings.json");

function readAll(): Booking[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(bookings: Booking[]) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(bookings, null, 2), "utf-8");
}

export class SlotTakenError extends Error {
  constructor() {
    super("That date and time is already booked.");
    this.name = "SlotTakenError";
  }
}

/**
 * Times unavailable on a given date, regardless of consultation type or
 * practice area — merges real bookings with owner-set availability blocks
 * (see availability-store.ts) so the UI shows one consistent "taken" set.
 */
export function listUnavailableTimes(date: string): string[] {
  if (isDateBlocked(date)) {
    // Whole day off — every slot is unavailable.
    return [...TIME_SLOTS];
  }
  const booked = readAll()
    .filter((b) => b.date === date)
    .map((b) => b.time);
  return [...new Set([...booked, ...getBlockedTimesForDate(date)])];
}

export function createBooking(input: BookingInput): Booking {
  if (isDateBlocked(input.date) || getBlockedTimesForDate(input.date).includes(input.time)) {
    throw new SlotTakenError();
  }

  const bookings = readAll();
  const taken = bookings.some((b) => b.date === input.date && b.time === input.time);
  if (taken) throw new SlotTakenError();

  const booking: Booking = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  bookings.push(booking);
  writeAll(bookings);
  return booking;
}

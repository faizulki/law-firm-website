import fs from "node:fs";
import path from "node:path";

/**
 * Owner-managed availability blocks (whole days off, or specific time
 * slots), file-backed on the same persisted volume as bookings/articles/
 * content overrides. Separate from bookings.json since these aren't real
 * client bookings — they're blocks the owner sets from /admin/availability.
 */

export type BlockedSlot = { date: string; time: string };

export type AvailabilityOverrides = {
  blockedDates: string[]; // whole days off, "YYYY-MM-DD"
  blockedSlots: BlockedSlot[]; // specific date+time blocks
};

const EMPTY: AvailabilityOverrides = { blockedDates: [], blockedSlots: [] };

const DATA_PATH =
  process.env.AVAILABILITY_DATA_PATH ??
  path.join(/*turbopackIgnore: true*/ process.cwd(), "data", "availability.json");

function readAll(): AvailabilityOverrides {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      blockedDates: Array.isArray(parsed.blockedDates) ? parsed.blockedDates : [],
      blockedSlots: Array.isArray(parsed.blockedSlots) ? parsed.blockedSlots : [],
    };
  } catch {
    return EMPTY;
  }
}

function writeAll(overrides: AvailabilityOverrides) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(overrides, null, 2), "utf-8");
}

export function getAvailabilityOverrides(): AvailabilityOverrides {
  return readAll();
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

export function saveAvailabilityOverrides(input: unknown): AvailabilityOverrides {
  if (!isPlainObject(input)) throw new Error("Expected a JSON object");
  const { blockedDates, blockedSlots } = input;

  if (!Array.isArray(blockedDates) || !blockedDates.every((d) => typeof d === "string" && DATE_RE.test(d))) {
    throw new Error("blockedDates must be an array of YYYY-MM-DD strings");
  }
  if (
    !Array.isArray(blockedSlots) ||
    !blockedSlots.every(
      (s) =>
        isPlainObject(s) &&
        typeof s.date === "string" &&
        DATE_RE.test(s.date) &&
        typeof s.time === "string" &&
        TIME_RE.test(s.time)
    )
  ) {
    throw new Error("blockedSlots must be an array of { date, time }");
  }

  const overrides: AvailabilityOverrides = {
    blockedDates: [...new Set(blockedDates as string[])].sort(),
    blockedSlots: blockedSlots as BlockedSlot[],
  };
  writeAll(overrides);
  return overrides;
}

export function isDateBlocked(date: string): boolean {
  return readAll().blockedDates.includes(date);
}

/** Blocked times for a date — either the whole day is blocked (returns all times moot; caller should check isDateBlocked separately) or specific slots. */
export function getBlockedTimesForDate(date: string): string[] {
  return readAll()
    .blockedSlots.filter((s) => s.date === date)
    .map((s) => s.time);
}

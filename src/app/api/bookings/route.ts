import { NextResponse } from "next/server";
import { createBooking, listUnavailableTimes, SlotTakenError } from "@/lib/bookings-store";
import { sendBookingEmails } from "@/lib/email";
import type { Booking, BookingInput, ConsultationType } from "@/lib/booking";
import type { Lang } from "@/lib/dictionary";

const CONSULTATION_TYPES: ConsultationType[] = ["personal", "video", "phone"];
const LANGS: Lang[] = ["sv", "en"];
const REQUIRED_STRING_FIELDS: (keyof BookingInput)[] = [
  "serviceAreaSlug",
  "serviceArea",
  "consultationType",
  "date",
  "time",
  "name",
  "email",
  "phone",
];

/** Times unavailable on a date (booked or owner-blocked), so the UI can grey them out before submit. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "invalid_date" }, { status: 400 });
  }
  return NextResponse.json({ unavailableTimes: listUnavailableTimes(date) });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const input = body as Record<string, unknown>;

  for (const key of REQUIRED_STRING_FIELDS) {
    if (typeof input[key] !== "string" || !(input[key] as string).trim()) {
      return NextResponse.json({ error: "missing_field", field: key }, { status: 400 });
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date as string)) {
    return NextResponse.json({ error: "invalid_date" }, { status: 400 });
  }
  if (!/^\d{2}:\d{2}$/.test(input.time as string)) {
    return NextResponse.json({ error: "invalid_time" }, { status: 400 });
  }
  if (!CONSULTATION_TYPES.includes(input.consultationType as ConsultationType)) {
    return NextResponse.json({ error: "invalid_consultation_type" }, { status: 400 });
  }
  const lang: Lang = LANGS.includes(input.lang as Lang) ? (input.lang as Lang) : "sv";

  let booking: Booking;
  try {
    booking = createBooking({
      serviceAreaSlug: input.serviceAreaSlug as string,
      serviceArea: input.serviceArea as string,
      consultationType: input.consultationType as ConsultationType,
      date: input.date as string,
      time: input.time as string,
      name: (input.name as string).trim(),
      email: (input.email as string).trim(),
      phone: (input.phone as string).trim(),
      message: typeof input.message === "string" ? input.message.trim() : "",
      lang,
    });
  } catch (err) {
    if (err instanceof SlotTakenError) {
      return NextResponse.json({ error: "slot_taken" }, { status: 409 });
    }
    console.error("[bookings] failed to create booking:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  await sendBookingEmails(booking, lang);

  return NextResponse.json(booking, { status: 201 });
}

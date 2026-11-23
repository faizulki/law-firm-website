import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

const LIMITS = { name: 200, email: 254, phone: 50, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Contact form → email to the firm inbox (BOOKING_NOTIFY_EMAIL, i.e. kontakt@invictuslaw.se). */
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
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  // Honeypot: the hidden "website" field is invisible to people, so anything
  // in it is a bot. Pretend success so it doesn't retry.
  if (str(input.website)) {
    return NextResponse.json({ ok: true });
  }

  const msg = {
    name: str(input.name),
    email: str(input.email),
    phone: str(input.phone),
    message: str(input.message),
  };

  if (!msg.name || !msg.email || !msg.message) {
    return NextResponse.json({ error: "missing_field" }, { status: 400 });
  }
  if (!EMAIL_RE.test(msg.email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
    if (msg[key].length > LIMITS[key]) {
      return NextResponse.json({ error: "too_long", field: key }, { status: 400 });
    }
  }

  const result = await sendContactEmail(msg);
  if (result !== "sent") {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

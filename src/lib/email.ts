import nodemailer from "nodemailer";
import type { Booking } from "./booking";
import type { Lang } from "./dictionary";

/**
 * Best-effort booking email notifications via SMTP (nodemailer). A failure
 * here is logged but never thrown — the booking itself is the source of
 * truth and must succeed even if email is unavailable or misconfigured.
 */

function getTransporter() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
}

function formatDate(iso: string, locale: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const TYPE_LABEL: Record<Booking["consultationType"], { sv: string; en: string }> = {
  personal: { sv: "Personligt möte", en: "Personal meeting" },
  video: { sv: "Videomöte", en: "Video consultation" },
  phone: { sv: "Telefonrådgivning", en: "Telephone consultation" },
};

function clientEmail(booking: Booking, lang: Lang) {
  const locale = lang === "sv" ? "sv-SE" : "en-US";
  const dateStr = formatDate(booking.date, locale);
  const typeLabel = TYPE_LABEL[booking.consultationType][lang];
  const firstName = booking.name.split(" ")[0];

  if (lang === "sv") {
    return {
      subject: "Din konsultation är bokad – Invictus Law",
      text: `Hej ${firstName},

Din konsultation hos Invictus Law är bokad.

Rättsområde: ${booking.serviceArea}
Format: ${typeLabel}
Datum: ${dateStr}
Tid: ${booking.time}

Referens: ${booking.id}

Vid frågor, kontakta oss på kontakt@invictuslaw.se.

Med vänlig hälsning,
Invictus Law`,
    };
  }

  return {
    subject: "Your consultation is booked – Invictus Law",
    text: `Hi ${firstName},

Your consultation with Invictus Law is booked.

Practice area: ${booking.serviceArea}
Format: ${typeLabel}
Date: ${dateStr}
Time: ${booking.time}

Reference: ${booking.id}

If you have any questions, contact us at kontakt@invictuslaw.se.

Best regards,
Invictus Law`,
  };
}

function firmEmail(booking: Booking) {
  const dateStr = formatDate(booking.date, "sv-SE");
  const typeLabel = TYPE_LABEL[booking.consultationType].sv;

  return {
    subject: `Ny bokning: ${booking.name} – ${dateStr} ${booking.time}`,
    text: `Ny konsultationsbokning:

Namn: ${booking.name}
E-post: ${booking.email}
Telefon: ${booking.phone}
Rättsområde: ${booking.serviceArea}
Format: ${typeLabel}
Datum: ${dateStr}
Tid: ${booking.time}
Meddelande: ${booking.message || "(inget meddelande)"}

Referens: ${booking.id}`,
  };
}

export async function sendBookingEmails(booking: Booking, lang: Lang): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[email] SMTP not configured (SMTP_HOST/SMTP_USER/SMTP_PASSWORD); skipping booking emails");
    return;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const notifyTo = process.env.BOOKING_NOTIFY_EMAIL || process.env.SMTP_USER!;

  const client = clientEmail(booking, lang);
  try {
    await transporter.sendMail({ from, to: booking.email, subject: client.subject, text: client.text });
  } catch (err) {
    console.error("[email] failed to send client confirmation:", err);
  }

  const firm = firmEmail(booking);
  try {
    await transporter.sendMail({
      from,
      to: notifyTo,
      subject: firm.subject,
      text: firm.text,
      replyTo: booking.email,
    });
  } catch (err) {
    console.error("[email] failed to send firm notification:", err);
  }
}

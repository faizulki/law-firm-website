"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Calendar } from "./Calendar";
import {
  bookingProvider,
  CONSULTATION_TYPES,
  TIME_SLOTS,
  type Booking,
  type ConsultationType,
} from "@/lib/booking";
import { practiceAreas } from "@/lib/content";

type Step = 0 | 1 | 2;

const STEPS = ["Service", "Date & Time", "Your Details"];

function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const fade = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

export function BookingForm() {
  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [serviceArea, setServiceArea] = useState(practiceAreas[0].title);
  const [consultationType, setConsultationType] =
    useState<ConsultationType>("Personal Meeting");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const stepValid = useMemo(() => {
    if (step === 0) return Boolean(serviceArea && consultationType);
    if (step === 1) return Boolean(date && time);
    return true;
  }, [step, serviceArea, consultationType, date, time]);

  function validateDetails(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!phone.trim()) next.phone = "Please enter a phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateDetails() || !date || !time) return;
    setSubmitting(true);
    try {
      const booking = await bookingProvider.createBooking({
        serviceArea,
        consultationType,
        date,
        time,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });
      setConfirmed(booking);
    } finally {
      setSubmitting(false);
    }
  }

  // ---- Confirmation screen ----
  if (confirmed) {
    return <Confirmation booking={confirmed} />;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      {/* Form column */}
      <div>
        {/* Step indicator */}
        <ol className="mb-10 flex items-center gap-2">
          {STEPS.map((label, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <li key={label} className="flex flex-1 items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                    active && "border-silver bg-silver text-ink",
                    done && "border-silver/50 bg-silver/20 text-white",
                    !active && !done && "border-steel text-mute"
                  )}
                >
                  {done ? <CheckCircle2 size={16} /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-sm sm:inline",
                    active ? "text-white" : "text-mute"
                  )}
                >
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="mx-1 hidden h-px flex-1 bg-steel sm:block" />
                )}
              </li>
            );
          })}
        </ol>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* STEP 1 — Service selection */}
            {step === 0 && (
              <motion.div key="step-0" {...fade}>
                <fieldset>
                  <legend className="font-serif text-2xl font-medium text-white">
                    What can we help you with?
                  </legend>
                  <label
                    htmlFor="serviceArea"
                    className="mt-6 block text-sm font-medium text-mute"
                  >
                    Practice area
                  </label>
                  <select
                    id="serviceArea"
                    value={serviceArea}
                    onChange={(e) => setServiceArea(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-steel bg-ink-2 px-4 py-3 text-white outline-none transition-colors focus:border-silver/60"
                  >
                    {practiceAreas.map((a) => (
                      <option key={a.slug} value={a.title}>
                        {a.title}
                      </option>
                    ))}
                  </select>

                  <p className="mt-8 text-sm font-medium text-mute">
                    Consultation format
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {CONSULTATION_TYPES.map((opt) => {
                      const selected = consultationType === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => setConsultationType(opt.value)}
                          aria-pressed={selected}
                          className={cn(
                            "rounded-xl border p-4 text-left transition-all duration-300",
                            selected
                              ? "border-silver/60 bg-white/[0.05]"
                              : "border-steel hover:border-silver/30"
                          )}
                        >
                          <span className="block text-sm font-medium text-white">
                            {opt.value}
                          </span>
                          <span className="mt-1 block text-xs text-silver/80">
                            {opt.duration}
                          </span>
                          <span className="mt-2 block text-xs leading-relaxed text-mute">
                            {opt.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </motion.div>
            )}

            {/* STEP 2 — Date & time */}
            {step === 1 && (
              <motion.div key="step-1" {...fade}>
                <h3 className="font-serif text-2xl font-medium text-white">
                  Choose a date &amp; time
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <Calendar value={date} onChange={(iso) => setDate(iso)} />
                  <div>
                    <p className="text-sm font-medium text-mute">
                      Available times{" "}
                      {date && (
                        <span className="text-silver">· {formatLongDate(date)}</span>
                      )}
                    </p>
                    {date ? (
                      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3">
                        {TIME_SLOTS.map((slot) => {
                          const selected = time === slot;
                          return (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setTime(slot)}
                              aria-pressed={selected}
                              className={cn(
                                "rounded-lg border py-2.5 text-sm transition-colors duration-300",
                                selected
                                  ? "border-silver bg-silver font-semibold text-ink"
                                  : "border-steel text-white/90 hover:border-silver/40"
                              )}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt-3 flex h-40 items-center justify-center rounded-xl border border-dashed border-steel text-sm text-mute">
                        Select a date to see available times
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Details */}
            {step === 2 && (
              <motion.div key="step-2" {...fade}>
                <h3 className="font-serif text-2xl font-medium text-white">
                  Your details
                </h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Full name"
                    icon={User}
                    value={name}
                    onChange={setName}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Field
                    id="phone"
                    label="Phone number"
                    icon={Phone}
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    error={errors.phone}
                    autoComplete="tel"
                  />
                  <div className="sm:col-span-2">
                    <Field
                      id="email"
                      label="Email address"
                      icon={Mail}
                      type="email"
                      value={email}
                      onChange={setEmail}
                      error={errors.email}
                      autoComplete="email"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-mute"
                    >
                      Briefly describe your matter{" "}
                      <span className="text-mute/60">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Share any details that will help us prepare for your consultation."
                      className="w-full resize-none rounded-xl border border-steel bg-ink-2 px-4 py-3 text-white placeholder:text-mute/50 outline-none transition-colors focus:border-silver/60"
                    />
                  </div>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-mute/70">
                  By submitting, you agree to be contacted regarding your
                  consultation. Submitting this form does not create an
                  attorney–client relationship.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between border-t border-steel/60 pt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-white"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <span />
            )}

            {step < 2 ? (
              <Button
                type="button"
                onClick={() => stepValid && setStep((s) => (s + 1) as Step)}
                disabled={!stepValid}
              >
                Continue <ArrowRight size={16} />
              </Button>
            ) : (
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Booking…
                  </>
                ) : (
                  <>Confirm Booking</>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Summary column */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="surface rounded-2xl p-6">
          <h4 className="eyebrow text-xs font-medium text-silver/80">
            Your consultation
          </h4>
          <dl className="mt-5 space-y-4 text-sm">
            <SummaryRow label="Service" value={serviceArea} />
            <SummaryRow label="Format" value={consultationType} />
            <SummaryRow
              label="Date"
              value={date ? formatLongDate(date) : "—"}
              icon={CalendarIcon}
            />
            <SummaryRow label="Time" value={time ?? "—"} icon={Clock} />
          </dl>
          <div className="mt-6 rounded-xl border border-silver/15 bg-white/[0.02] p-4">
            <p className="text-sm font-medium text-white">
              Free 30-minute consultation
            </p>
            <p className="mt-1 text-xs leading-relaxed text-mute">
              No obligation. We&apos;ll review your matter and outline a clear path
              forward.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof CalendarIcon;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-steel/50 pb-4 last:border-0 last:pb-0">
      <dt className="flex items-center gap-2 text-mute">
        {Icon && <Icon size={14} className="text-silver/60" />}
        {label}
      </dt>
      <dd className="text-right font-medium text-white">{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  icon: typeof User;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-mute">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute/60"
        />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "w-full rounded-xl border bg-ink-2 px-4 py-3 pl-11 text-white placeholder:text-mute/50 outline-none transition-colors",
            error ? "border-red-500/60" : "border-steel focus:border-silver/60"
          )}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function Confirmation({ booking }: { booking: Booking }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-xl text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 16 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-silver/30 bg-white/[0.04]"
      >
        <CheckCircle2 size={40} className="text-silver" />
      </motion.div>

      <h2 className="mt-8 font-serif text-3xl font-medium text-white sm:text-4xl">
        Your consultation is booked
      </h2>
      <p className="mt-4 text-mute">
        Thank you, {booking.name.split(" ")[0]}. A confirmation has been recorded
        and our team will reach out to {booking.email} to confirm the details.
      </p>

      <div className="surface mt-8 rounded-2xl p-6 text-left">
        <dl className="space-y-4 text-sm">
          <SummaryRow label="Service" value={booking.serviceArea} />
          <SummaryRow label="Format" value={booking.consultationType} />
          <SummaryRow
            label="Date"
            value={formatLongDate(booking.date)}
            icon={CalendarIcon}
          />
          <SummaryRow label="Time" value={booking.time} icon={Clock} />
          {booking.consultationType === "Personal Meeting" && (
            <SummaryRow
              label="Location"
              value="123 Liberty Avenue, NY"
              icon={MapPin}
            />
          )}
        </dl>
        <p className="mt-5 border-t border-steel/60 pt-4 text-xs text-mute/70">
          Reference: {booking.id}
        </p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/">Return Home</Button>
        <Button href="/services" variant="secondary">
          Explore Services
        </Button>
      </div>
    </motion.div>
  );
}

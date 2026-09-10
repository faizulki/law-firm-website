"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
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
import { useLang, fmt, type Dict } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Calendar } from "./Calendar";
import {
  bookingProvider,
  getBookedTimes,
  BookingError,
  TIME_SLOTS,
  type Booking,
  type ConsultationType,
} from "@/lib/booking";
import { pick } from "@/lib/content";
import { useSiteData } from "@/lib/site-data";
import type { SiteConfig } from "@/lib/site-data";

type Step = 0 | 1 | 2;

function formatLongDate(iso: string, locale: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, {
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
  const { t, lang } = useLang();
  const { practiceAreas, site } = useSiteData();
  const STEPS = t.booking.steps;

  const types: { id: ConsultationType; label: string; duration: string; desc: string }[] = [
    { id: "personal", ...t.booking.types.personal },
    { id: "video", ...t.booking.types.video },
    { id: "phone", ...t.booking.types.phone },
  ];

  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [serviceSlug, setServiceSlug] = useState(practiceAreas[0].slug);
  const [consultationType, setConsultationType] = useState<ConsultationType>("personal");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Refresh which times are already booked whenever the selected date changes.
  // (date starts null and is only ever set to a real value by handleDateChange,
  // so bookedTimes' initial [] already covers the no-date case.)
  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingTimes(true);
    getBookedTimes(date).then((times) => {
      if (!cancelled) {
        setBookedTimes(times);
        setLoadingTimes(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [date]);

  function handleDateChange(iso: string) {
    setDate(iso);
    setTime(null); // a time chosen for a previous date shouldn't carry over
    setSubmitError(null);
  }

  const currentArea = practiceAreas.find((a) => a.slug === serviceSlug)!;
  const serviceLabel = pick(currentArea.title, lang);
  const typeLabel = (id: ConsultationType) =>
    types.find((x) => x.id === id)?.label ?? id;

  const stepValid = useMemo(() => {
    if (step === 0) return Boolean(serviceSlug && consultationType);
    if (step === 1) return Boolean(date && time);
    return true;
  }, [step, serviceSlug, consultationType, date, time]);

  function validateDetails(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = t.booking.errName;
    if (!email.trim()) next.email = t.booking.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = t.booking.errEmailValid;
    if (!phone.trim()) next.phone = t.booking.errPhone;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateDetails() || !date || !time) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const booking = await bookingProvider.createBooking({
        serviceAreaSlug: serviceSlug,
        serviceArea: serviceLabel,
        consultationType,
        date,
        time,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });
      setConfirmed(booking);
    } catch (err) {
      if (err instanceof BookingError && err.code === "slot_taken") {
        setSubmitError(t.booking.errSlotTaken);
        setTime(null);
        getBookedTimes(date).then(setBookedTimes);
      } else {
        setSubmitError(t.booking.errGeneric);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <Confirmation
        booking={confirmed}
        t={t}
        locale={t.locale}
        typeLabel={typeLabel(confirmed.consultationType)}
        site={site}
      />
    );
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
                    {t.booking.step1Title}
                  </legend>
                  <label
                    htmlFor="serviceArea"
                    className="mt-6 block text-sm font-medium text-mute"
                  >
                    {t.booking.practiceAreaLabel}
                  </label>
                  <select
                    id="serviceArea"
                    value={serviceSlug}
                    onChange={(e) => setServiceSlug(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-steel bg-ink-2 px-4 py-3 text-white outline-none transition-colors focus:border-silver/60"
                  >
                    {practiceAreas.map((a) => (
                      <option key={a.slug} value={a.slug}>
                        {pick(a.title, lang)}
                      </option>
                    ))}
                  </select>

                  <p className="mt-8 text-sm font-medium text-mute">
                    {t.booking.formatLabel}
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {types.map((opt) => {
                      const selected = consultationType === opt.id;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setConsultationType(opt.id)}
                          aria-pressed={selected}
                          className={cn(
                            "rounded-xl border p-4 text-left transition-all duration-300",
                            selected
                              ? "border-silver/60 bg-white/[0.05]"
                              : "border-steel hover:border-silver/30"
                          )}
                        >
                          <span className="block text-sm font-medium text-white">
                            {opt.label}
                          </span>
                          <span className="mt-1 block text-xs text-silver/80">
                            {opt.duration}
                          </span>
                          <span className="mt-2 block text-xs leading-relaxed text-mute">
                            {opt.desc}
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
                  {t.booking.step2Title}
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <Calendar value={date} onChange={handleDateChange} />
                  <div>
                    <p className="text-sm font-medium text-mute">
                      {t.booking.availableTimes}{" "}
                      {date && (
                        <span className="text-silver">
                          · {formatLongDate(date, t.locale)}
                        </span>
                      )}
                    </p>
                    {date ? (
                      <div
                        aria-busy={loadingTimes}
                        className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3"
                      >
                        {TIME_SLOTS.map((slot) => {
                          const selected = time === slot;
                          const taken = bookedTimes.includes(slot);
                          return (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => !taken && setTime(slot)}
                              disabled={taken}
                              aria-pressed={selected}
                              className={cn(
                                "rounded-lg border py-2.5 text-sm transition-colors duration-300",
                                taken &&
                                  "cursor-not-allowed border-steel/40 text-mute/30 line-through",
                                !taken &&
                                  selected &&
                                  "border-silver bg-silver font-semibold text-ink",
                                !taken &&
                                  !selected &&
                                  "border-steel text-white/90 hover:border-silver/40"
                              )}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt-3 flex h-40 items-center justify-center rounded-xl border border-dashed border-steel text-sm text-mute">
                        {t.booking.selectDate}
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
                  {t.booking.step3Title}
                </h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field
                    id="name"
                    label={t.booking.fullName}
                    icon={User}
                    value={name}
                    onChange={setName}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Field
                    id="phone"
                    label={t.booking.phone}
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
                      label={t.booking.email}
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
                      {t.booking.matterLabel}{" "}
                      <span className="text-mute/60">{t.booking.matterOptional}</span>
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder={t.booking.matterPlaceholder}
                      className="w-full resize-none rounded-xl border border-steel bg-ink-2 px-4 py-3 text-white placeholder:text-mute/50 outline-none transition-colors focus:border-silver/60"
                    />
                  </div>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-mute/70">
                  {t.booking.agreement}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {submitError && (
            <p className="mt-6 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
              <AlertCircle size={16} className="shrink-0" />
              {submitError}
            </p>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between border-t border-steel/60 pt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-white"
              >
                <ArrowLeft size={16} /> {t.booking.back}
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
                {t.booking.continue} <ArrowRight size={16} />
              </Button>
            ) : (
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> {t.booking.booking}
                  </>
                ) : (
                  <>{t.booking.confirm}</>
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
            {t.booking.summaryTitle}
          </h4>
          <dl className="mt-5 space-y-4 text-sm">
            <SummaryRow label={t.booking.fmtService} value={serviceLabel} />
            <SummaryRow label={t.booking.fmtFormat} value={typeLabel(consultationType)} />
            <SummaryRow
              label={t.booking.fmtDate}
              value={date ? formatLongDate(date, t.locale) : "—"}
              icon={CalendarIcon}
            />
            <SummaryRow label={t.booking.fmtTime} value={time ?? "—"} icon={Clock} />
          </dl>
          <div className="mt-6 rounded-xl border border-silver/15 bg-white/[0.02] p-4">
            <p className="text-sm font-medium text-white">{t.booking.freeTitle}</p>
            <p className="mt-1 text-xs leading-relaxed text-mute">{t.booking.freeDesc}</p>
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

function Confirmation({
  booking,
  t,
  locale,
  typeLabel,
  site,
}: {
  booking: Booking;
  t: Dict;
  locale: string;
  typeLabel: string;
  site: SiteConfig;
}) {
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
        {t.booking.confTitle}
      </h2>
      <p className="mt-4 text-mute">
        {fmt(t.booking.confThanks, {
          name: booking.name.split(" ")[0],
          email: booking.email,
        })}
      </p>

      <div className="surface mt-8 rounded-2xl p-6 text-left">
        <dl className="space-y-4 text-sm">
          <SummaryRow label={t.booking.fmtService} value={booking.serviceArea} />
          <SummaryRow label={t.booking.fmtFormat} value={typeLabel} />
          <SummaryRow
            label={t.booking.fmtDate}
            value={formatLongDate(booking.date, locale)}
            icon={CalendarIcon}
          />
          <SummaryRow label={t.booking.fmtTime} value={booking.time} icon={Clock} />
          {booking.consultationType === "personal" && (
            <SummaryRow
              label={t.booking.location}
              value={`${site.address.line1}, ${site.address.line2}`}
              icon={MapPin}
            />
          )}
        </dl>
        <p className="mt-5 border-t border-steel/60 pt-4 text-xs text-mute/70">
          {t.booking.reference}: {booking.id}
        </p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/">{t.booking.returnHome}</Button>
        <Button href="/services" variant="secondary">
          {t.booking.exploreServices}
        </Button>
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./ui/Button";

/**
 * ContactForm — demo contact form. Persists messages to localStorage so the
 * UI is fully functional without a backend. Swap `persistMessage` for a real
 * API/email service when going live.
 */

type FormState = { name: string; email: string; phone: string; message: string };

function persistMessage(data: FormState) {
  if (typeof window === "undefined") return;
  const key = "invictus_contact_messages";
  const prev = JSON.parse(window.localStorage.getItem(key) ?? "[]");
  window.localStorage.setItem(
    key,
    JSON.stringify([{ ...data, at: new Date().toISOString() }, ...prev])
  );
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    persistMessage(form);
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface flex h-full flex-col items-center justify-center rounded-2xl p-10 text-center"
      >
        <CheckCircle2 size={44} className="text-silver" />
        <h3 className="mt-6 font-serif text-2xl font-medium text-white">
          Message received
        </h3>
        <p className="mt-3 max-w-sm text-sm text-mute">
          Thank you, {form.name.split(" ")[0]}. A member of our team will be in
          touch within one business day.
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setForm({ name: "", email: "", phone: "", message: "" });
            setSent(false);
          }}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="surface rounded-2xl p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="c-name"
          label="Full name"
          value={form.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <FormField
          id="c-phone"
          label="Phone (optional)"
          type="tel"
          value={form.phone}
          onChange={(v) => update("phone", v)}
          autoComplete="tel"
        />
        <div className="sm:col-span-2">
          <FormField
            id="c-email"
            label="Email address"
            type="email"
            value={form.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
            autoComplete="email"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="c-message"
            className="mb-2 block text-sm font-medium text-mute"
          >
            How can we help?
          </label>
          <textarea
            id="c-message"
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            placeholder="Tell us a little about your legal matter."
            className={cn(
              "w-full resize-none rounded-xl border bg-ink-2 px-4 py-3 text-white placeholder:text-mute/50 outline-none transition-colors",
              errors.message ? "border-red-500/60" : "border-steel focus:border-silver/60"
            )}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={sending}>
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
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
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(
          "w-full rounded-xl border bg-ink-2 px-4 py-3 text-white placeholder:text-mute/50 outline-none transition-colors",
          error ? "border-red-500/60" : "border-steel focus:border-silver/60"
        )}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

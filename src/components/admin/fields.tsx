"use client";

import { Plus, Trash2 } from "lucide-react";
import { type ReactNode } from "react";

const inputClass =
  "w-full rounded-lg border border-steel/60 bg-ink px-3 py-2 text-sm text-white placeholder:text-mute/50 focus:border-silver/50 focus:outline-none";

export function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-mute">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-mute">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${inputClass} resize-y leading-relaxed`}
      />
    </label>
  );
}

/** Repeatable list of short strings (e.g. keywords, hours lines) — one line each. */
export function StringList({
  label,
  values,
  onChange,
  itemLabel = "Rad",
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  itemLabel?: string;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-mute">{label}</span>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={v}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="shrink-0 rounded-lg border border-steel/60 p-2 text-mute hover:border-red-400/40 hover:text-red-300"
              aria-label={`Ta bort ${itemLabel.toLowerCase()}`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-silver hover:text-white"
      >
        <Plus size={14} /> Lägg till {itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

/** Repeatable list of paragraph-length strings — each a textarea. */
export function ParagraphList({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-mute">{label}</span>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-start gap-2">
            <textarea
              value={v}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
              rows={3}
              className={`${inputClass} resize-y leading-relaxed`}
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="mt-1 shrink-0 rounded-lg border border-steel/60 p-2 text-mute hover:border-red-400/40 hover:text-red-300"
              aria-label="Ta bort stycke"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-silver hover:text-white"
      >
        <Plus size={14} /> Lägg till stycke
      </button>
    </div>
  );
}

export function Collapsible({
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="surface rounded-2xl [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
        <span>
          <span className="font-serif text-lg font-medium text-white">{title}</span>
          {subtitle && <span className="ml-2 text-xs text-mute">{subtitle}</span>}
        </span>
        <span className="text-xs text-mute">Visa/dölj</span>
      </summary>
      <div className="space-y-5 border-t border-steel/40 px-5 py-5">{children}</div>
    </details>
  );
}

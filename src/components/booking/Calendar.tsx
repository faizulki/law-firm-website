"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Calendar — lightweight month-grid date picker with no external dependencies.
 * Disables past dates and weekends (demo availability). Emits ISO yyyy-mm-dd.
 */

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function Calendar({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (iso: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDayOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDayOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const canGoPrev =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth());

  const isDisabled = (d: Date) => {
    const day = d.getDay();
    return d < today || day === 0 || day === 6; // past or weekend
  };

  return (
    <div className="surface rounded-2xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canGoPrev && setView(new Date(year, month - 1, 1))}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-mute transition-colors hover:bg-white/[0.05] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-serif text-lg font-medium text-white">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setView(new Date(year, month + 1, 1))}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-mute transition-colors hover:bg-white/[0.05] hover:text-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-2 text-xs font-medium text-mute/70">
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={`empty-${i}`} />;
          const iso = toISO(d);
          const disabled = isDisabled(d);
          const selected = value === iso;
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              aria-pressed={selected}
              aria-label={`${MONTHS[month]} ${d.getDate()}, ${year}`}
              className={cn(
                "flex h-10 items-center justify-center rounded-lg text-sm transition-colors duration-300",
                disabled && "cursor-not-allowed text-mute/25",
                !disabled && !selected && "text-white/90 hover:bg-white/[0.06]",
                selected && "bg-silver font-semibold text-ink"
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-mute/70">
        Weekdays only. All times shown in your local timezone.
      </p>
    </div>
  );
}

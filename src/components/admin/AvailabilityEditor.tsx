"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { TIME_SLOTS } from "@/lib/booking";
import type { AvailabilityOverrides, BlockedSlot } from "@/lib/availability-store";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
  return data as T;
}

const inputClass =
  "rounded-lg border border-steel/60 bg-ink px-3 py-2 text-sm text-white focus:border-silver/50 focus:outline-none";

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function AvailabilityEditor() {
  const [overrides, setOverrides] = useState<AvailabilityOverrides | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const [newDate, setNewDate] = useState(todayISO());
  const [slotDate, setSlotDate] = useState(todayISO());
  const [slotTime, setSlotTime] = useState<string>(TIME_SLOTS[0]);

  useEffect(() => {
    fetchJson<AvailabilityOverrides>("/api/admin/availability")
      .then(setOverrides)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!overrides) return;
    setSaving(true);
    setError(null);
    try {
      await fetchJson("/api/admin/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(overrides),
      });
      setSavedAt(Date.now());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kunde inte spara");
    } finally {
      setSaving(false);
    }
  }

  function addBlockedDate() {
    if (!overrides || overrides.blockedDates.includes(newDate)) return;
    setOverrides({
      ...overrides,
      blockedDates: [...overrides.blockedDates, newDate].sort(),
    });
  }

  function removeBlockedDate(date: string) {
    if (!overrides) return;
    setOverrides({ ...overrides, blockedDates: overrides.blockedDates.filter((d) => d !== date) });
  }

  function addBlockedSlot() {
    if (!overrides) return;
    const exists = overrides.blockedSlots.some((s) => s.date === slotDate && s.time === slotTime);
    if (exists) return;
    const next: BlockedSlot[] = [...overrides.blockedSlots, { date: slotDate, time: slotTime }].sort(
      (a, b) => (a.date + a.time).localeCompare(b.date + b.time)
    );
    setOverrides({ ...overrides, blockedSlots: next });
  }

  function removeBlockedSlot(date: string, time: string) {
    if (!overrides) return;
    setOverrides({
      ...overrides,
      blockedSlots: overrides.blockedSlots.filter((s) => !(s.date === date && s.time === time)),
    });
  }

  if (loading) return <p className="text-mute">Laddar…</p>;
  if (!overrides) return <p className="text-red-300">Kunde inte läsa tillgänglighet. {error}</p>;

  return (
    <div className="space-y-8 pb-32">
      <div>
        <h1 className="font-serif text-2xl font-medium text-white">Tillgänglighet</h1>
        <p className="mt-1 text-sm text-mute">
          Markera hela dagar eller enstaka tider som inte går att boka — t.ex. semester, helgdagar
          eller andra åtaganden.
        </p>
      </div>

      {/* Blocked whole days */}
      <div className="surface rounded-2xl p-5">
        <h2 className="font-serif text-lg font-medium text-white">Helt lediga dagar</h2>
        <p className="mt-1 text-xs text-mute">
          Dessa dagar visas som otillgängliga i kalendern och går inte att välja.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className={inputClass}
          />
          <button
            type="button"
            onClick={addBlockedDate}
            className="inline-flex items-center gap-1.5 rounded-lg border border-steel/60 px-3 py-2 text-sm text-silver hover:text-white"
          >
            <Plus size={14} /> Lägg till
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {overrides.blockedDates.length === 0 && (
            <li className="text-sm text-mute">Inga dagar blockerade.</li>
          )}
          {overrides.blockedDates.map((date) => (
            <li
              key={date}
              className="flex items-center justify-between rounded-lg border border-steel/40 px-3 py-2 text-sm text-white"
            >
              {date}
              <button
                type="button"
                onClick={() => removeBlockedDate(date)}
                className="text-mute hover:text-red-300"
                aria-label={`Ta bort ${date}`}
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Blocked specific slots */}
      <div className="surface rounded-2xl p-5">
        <h2 className="font-serif text-lg font-medium text-white">Blockerade tider</h2>
        <p className="mt-1 text-xs text-mute">
          Blockera en enstaka tid på en specifik dag, utan att stänga hela dagen.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={slotDate}
            onChange={(e) => setSlotDate(e.target.value)}
            className={inputClass}
          />
          <select
            value={slotTime}
            onChange={(e) => setSlotTime(e.target.value)}
            className={inputClass}
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addBlockedSlot}
            className="inline-flex items-center gap-1.5 rounded-lg border border-steel/60 px-3 py-2 text-sm text-silver hover:text-white"
          >
            <Plus size={14} /> Lägg till
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {overrides.blockedSlots.length === 0 && (
            <li className="text-sm text-mute">Inga enskilda tider blockerade.</li>
          )}
          {overrides.blockedSlots.map((s) => (
            <li
              key={`${s.date}-${s.time}`}
              className="flex items-center justify-between rounded-lg border border-steel/40 px-3 py-2 text-sm text-white"
            >
              {s.date} · {s.time}
              <button
                type="button"
                onClick={() => removeBlockedSlot(s.date, s.time)}
                className="text-mute hover:text-red-300"
                aria-label={`Ta bort ${s.date} ${s.time}`}
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-steel/60 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="text-sm">
            {error && <span className="text-red-300">{error}</span>}
            {!error && savedAt && <span className="text-mute">Sparat.</span>}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-silver px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white disabled:opacity-50"
          >
            <Save size={15} /> {saving ? "Sparar…" : "Spara ändringar"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Inloggning misslyckades");
      router.push(searchParams.get("next") ?? "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Inloggning misslyckades");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="surface w-full max-w-sm rounded-2xl p-8">
      <h1 className="font-serif text-2xl font-medium text-white">Admin</h1>
      <p className="mt-1 text-sm text-mute">Logga in för att redigera webbplatsens innehåll.</p>

      <label className="mt-6 block">
        <span className="mb-1.5 block text-xs font-medium text-mute">Lösenord</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full rounded-lg border border-steel/60 bg-ink px-3 py-2 text-sm text-white focus:border-silver/50 focus:outline-none"
        />
      </label>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-silver px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white disabled:opacity-50"
      >
        {loading ? "Loggar in…" : "Logga in"}
      </button>
    </form>
  );
}

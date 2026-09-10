import { NextResponse } from "next/server";
import { getAvailabilityOverrides, saveAvailabilityOverrides } from "@/lib/availability-store";

// Protected by proxy.ts (matcher covers /api/admin/*).

export async function GET() {
  return NextResponse.json(getAvailabilityOverrides());
}

export async function PUT(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const saved = saveAvailabilityOverrides(body);
    return NextResponse.json({ ok: true, availability: saved });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save availability";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}

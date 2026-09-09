import { NextResponse } from "next/server";
import { getEditableContent, saveEditableContent } from "@/lib/content-store";

// Reads/writes are protected by proxy.ts (matcher covers /api/admin/*).

export async function GET() {
  return NextResponse.json(getEditableContent());
}

export async function PUT(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const saved = saveEditableContent(body);
    return NextResponse.json({ ok: true, content: saved });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save content";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}

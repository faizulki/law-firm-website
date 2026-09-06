import { NextRequest, NextResponse } from "next/server";
import { upsertArticle } from "@/lib/articles";

/**
 * Receives published articles from Soro SEO (trysoro.com). Soro's exact
 * payload/auth format for custom sites isn't publicly documented, so this
 * accepts the token either in the URL path (works with "just paste a URL"
 * webhook UIs) or in an `x-webhook-secret` / `Authorization: Bearer` header
 * (in case Soro's dashboard exposes a custom-header option instead).
 *
 * Set SORO_WEBHOOK_TOKEN in the environment and give Soro this URL:
 *   https://<your-domain>/api/webhooks/soro/<SORO_WEBHOOK_TOKEN>
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const expected = process.env.SORO_WEBHOOK_TOKEN;
  if (!expected) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const { token } = await params;
  const headerSecret =
    req.headers.get("x-webhook-secret") ??
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (token !== expected && headerSecret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Expected a JSON object body" }, { status: 400 });
  }

  console.log("[soro-webhook] received fields:", Object.keys(body as Record<string, unknown>));

  try {
    const article = upsertArticle(body as Record<string, unknown>);
    return NextResponse.json({ ok: true, slug: article.slug }, { status: 200 });
  } catch (err) {
    console.error("[soro-webhook] failed to process payload:", err);
    const message = err instanceof Error ? err.message : "Could not process article";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}

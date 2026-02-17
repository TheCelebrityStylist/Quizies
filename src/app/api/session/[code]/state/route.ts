import { NextResponse } from "next/server";
import { publicState } from "@/lib/session";
import { loadSession } from "@/lib/session-store";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await rateLimit("join", `${code}:${ip}`, 100, 60);
  if (!allowed) return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });

  const s = await loadSession(code);
  if (!s) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json(publicState(s));
}

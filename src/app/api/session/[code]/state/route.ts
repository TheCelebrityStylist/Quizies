import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { publicState, type SessionState } from "@/lib/session";

export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const s = (await redis.get(`session:${code}`)) as SessionState | null;
  if (!s) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json(publicState(s));
}

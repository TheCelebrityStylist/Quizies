import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { pusher } from "@/lib/pusher-server";
import { publicState, type SessionState } from "@/lib/session";

function forbid() {
  return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
}

export async function POST(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const s = (await redis.get(`session:${code}`)) as SessionState | null;
  if (!s) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const token = (await cookies()).get("quizos_host")?.value ?? "";
  if (token !== s.hostToken) return forbid();

  if (s.status !== "lobby") return NextResponse.json(publicState(s));

  s.status = "live";
  s.questionIndex = 0;

  await redis.set(`session:${code}`, s, { ex: 60 * 60 * 6 });

  const pub = publicState(s);
  await pusher.trigger(`session-${code}`, "session:update", pub);

  return NextResponse.json(pub);
}

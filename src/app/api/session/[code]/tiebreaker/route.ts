import { NextResponse } from "next/server";
import { getPusher } from "@/lib/pusher-server";
import { publicState } from "@/lib/session";
import { loadSession, requireHostSession, saveSession } from "@/lib/session-store";

export async function POST(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const s = await loadSession(code);
  if (!s) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const forbidden = await requireHostSession(s);
  if (forbidden) return forbidden;

  if (!s.quiz.tieBreaker) return NextResponse.json({ error: "NO_TIEBREAKER" }, { status: 409 });

  s.status = "live";
  s.phase = "question";
  s.tieBreakerActive = true;
  s.answered = {};

  await saveSession(code, s);
  const pub = publicState(s);
  await getPusher().trigger(`session-${code}`, "session:update", pub);
  return NextResponse.json(pub);
}

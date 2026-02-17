import { NextResponse } from "next/server";
import { getPusher } from "@/lib/pusher-server";
import { flattenQuestions } from "@/lib/quiz";
import { publicState } from "@/lib/session";
import { loadSession, requireHostSession, saveSession } from "@/lib/session-store";

export async function POST(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const s = await loadSession(code);
  if (!s) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const forbidden = await requireHostSession(s);
  if (forbidden) return forbidden;
  if (s.status !== "live") return NextResponse.json(publicState(s));

  s.phase = "question";
  s.answered = {};

  if (s.tieBreakerActive) {
    s.status = "finished";
  } else {
    const nextIndex = s.questionIndex + 1;
    if (nextIndex >= flattenQuestions(s.quiz).length) {
      s.status = "finished";
    } else {
      s.questionIndex = nextIndex;
    }
  }

  await saveSession(code, s);
  const pub = publicState(s);
  await getPusher().trigger(`session-${code}`, "session:update", pub);
  return NextResponse.json(pub);
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { getPusher } from "@/lib/pusher-server";
import { getCurrentQuestion, getScoreKey, publicState } from "@/lib/session";
import { loadSession, saveSession } from "@/lib/session-store";
import { rateLimit } from "@/lib/rate-limit";

const bodySchema = z.object({
  name: z.string().min(1).max(24),
  teamName: z.string().max(24).optional(),
  choiceIndex: z.number().int().min(0).max(3),
});

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await rateLimit("answer", `${code}:${ip}`, 40, 60);
  if (!allowed) return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });

  const s = await loadSession(code);
  if (!s) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (s.status !== "live" || s.phase !== "question") {
    return NextResponse.json({ error: "NOT_ACCEPTING_ANSWERS" }, { status: 409 });
  }

  const q = getCurrentQuestion(s);
  if (!q) return NextResponse.json({ error: "NO_QUESTION" }, { status: 409 });

  const name = parsed.data.name.trim();
  if (s.answered[name] === q.id) return NextResponse.json(publicState(s));

  const scoreKey = getScoreKey(s, name, parsed.data.teamName);
  s.scores[scoreKey] = s.scores[scoreKey] ?? 0;
  if (parsed.data.choiceIndex === q.correctIndex) s.scores[scoreKey] += s.tieBreakerActive ? 200 : 100;
  s.answered[name] = q.id;

  await saveSession(code, s);
  const pub = publicState(s);
  await getPusher().trigger(`session-${code}`, "scores:update", { scores: pub.scores });
  return NextResponse.json(pub);
}

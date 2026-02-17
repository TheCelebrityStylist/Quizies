import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { pusher } from "@/lib/pusher-server";
import { z } from "zod";
import { publicState, type SessionState } from "@/lib/session";

const bodySchema = z.object({
  name: z.string().min(1).max(24),
  choiceIndex: z.number().int().min(0).max(3),
});

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });
  }

  const s = (await redis.get(`session:${code}`)) as SessionState | null;
  if (!s) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (s.status !== "live" || s.questionIndex < 0) {
    return NextResponse.json({ error: "NOT_LIVE" }, { status: 409 });
  }

  const q = s.quiz.questions[s.questionIndex];
  const name = parsed.data.name.trim();
  const already = s.answered[name];

  if (already === q.id) return NextResponse.json(publicState(s));

  s.scores[name] = s.scores[name] ?? 0;
  if (parsed.data.choiceIndex === q.correctIndex) s.scores[name] += 100;

  s.answered[name] = q.id;

  await redis.set(`session:${code}`, s, { ex: 60 * 60 * 6 });

  const pub = publicState(s);
  await pusher.trigger(`session-${code}`, "scores:update", { scores: pub.scores });

  return NextResponse.json(pub);
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { getRedis, redisKeys } from "@/lib/redis";

const questionSchema = z.object({
  id: z.string().min(1),
  prompt: z.string().min(3),
  options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  correctIndex: z.number().int().min(0).max(3),
});

const quizSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  oneOffPriceEur: z.number().min(0),
  rounds: z.array(z.object({ id: z.string(), title: z.string(), questions: z.array(questionSchema).min(1) })).min(1),
  tieBreaker: questionSchema.optional(),
});

export async function POST(req: Request) {
  const parsed = quizSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "BAD_REQUEST", issues: parsed.error.issues }, { status: 400 });

  await getRedis().set(redisKeys.quiz(parsed.data.slug), parsed.data);
  return NextResponse.json({ ok: true, slug: parsed.data.slug });
}

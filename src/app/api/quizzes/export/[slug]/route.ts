import { NextResponse } from "next/server";
import { getRedis, redisKeys } from "@/lib/redis";
import { getQuizBySlug } from "@/lib/quiz";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stored = await getRedis().get(redisKeys.quiz(slug));
  const quiz = stored ?? getQuizBySlug(slug);
  if (!quiz) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json(quiz);
}

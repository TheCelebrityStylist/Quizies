import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getRedis, redisKeys, SESSION_TTL_SECONDS } from "@/lib/redis";
import { defaultQuiz, getQuizBySlug } from "@/lib/quiz";
import { newSession } from "@/lib/session";

const createBody = z.object({
  quizSlug: z.string().optional(),
  teamMode: z.boolean().optional(),
});

export async function POST(req: Request) {
  const body = createBody.safeParse(await req.json().catch(() => ({})));
  const quiz = body.success && body.data.quizSlug ? getQuizBySlug(body.data.quizSlug) ?? defaultQuiz : defaultQuiz;

  const session = newSession(quiz);
  if (body.success && typeof body.data.teamMode === "boolean") session.teamMode = body.data.teamMode;

  await getRedis().set(redisKeys.session(session.code), session, { ex: SESSION_TTL_SECONDS });

  const c = await cookies();
  c.set({
    name: "quizos_host",
    value: session.hostToken,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return NextResponse.json({ code: session.code });
}

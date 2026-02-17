import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { defaultQuiz } from "@/lib/quiz";
import { newSession } from "@/lib/session";

export async function POST() {
  const session = newSession(defaultQuiz);

  await redis.set(`session:${session.code}`, session, { ex: 60 * 60 * 6 });

  const c = await cookies();
  c.set({
    name: "quizos_host",
    value: session.hostToken,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 6,
  });

  return NextResponse.json({ code: session.code });
}

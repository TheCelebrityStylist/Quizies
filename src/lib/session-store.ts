import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getRedis, redisKeys, SESSION_TTL_SECONDS } from "./redis";
import type { SessionState } from "./session";

export async function loadSession(code: string) {
  return (await getRedis().get(redisKeys.session(code))) as SessionState | null;
}

export async function saveSession(code: string, session: SessionState) {
  await getRedis().set(redisKeys.session(code), session, { ex: SESSION_TTL_SECONDS });
}

export async function requireHostSession(session: SessionState) {
  const token = (await cookies()).get("quizos_host")?.value ?? "";
  if (token !== session.hostToken) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  return null;
}

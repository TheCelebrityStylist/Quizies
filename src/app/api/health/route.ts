import { NextResponse } from "next/server";
import { getEnvChecks } from "@/lib/env";

export async function GET() {
  const checks = getEnvChecks();

  return NextResponse.json({
    ok: true,
    ts: Date.now(),
    env: {
      hasPusher: checks.PUSHER_APP_ID && checks.PUSHER_KEY && checks.PUSHER_SECRET && checks.PUSHER_CLUSTER,
      hasRedis: checks.UPSTASH_REDIS_REST_URL && checks.UPSTASH_REDIS_REST_TOKEN,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    },
  });
}

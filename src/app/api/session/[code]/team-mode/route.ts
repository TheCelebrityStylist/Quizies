import { NextResponse } from "next/server";
import { z } from "zod";
import { getPusher } from "@/lib/pusher-server";
import { publicState } from "@/lib/session";
import { loadSession, requireHostSession, saveSession } from "@/lib/session-store";

const bodySchema = z.object({ enabled: z.boolean() });

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });

  const { code } = await params;
  const s = await loadSession(code);
  if (!s) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const forbidden = await requireHostSession(s);
  if (forbidden) return forbidden;

  s.teamMode = parsed.data.enabled;
  await saveSession(code, s);
  const pub = publicState(s);
  await getPusher().trigger(`session-${code}`, "session:update", pub);
  return NextResponse.json(pub);
}

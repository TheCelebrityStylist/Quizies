import { z } from "zod";

const serverSchema = z.object({
  PUSHER_APP_ID: z.string().min(1),
  PUSHER_KEY: z.string().min(1),
  PUSHER_SECRET: z.string().min(1),
  PUSHER_CLUSTER: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
});

const clientSchema = z.object({
  NEXT_PUBLIC_PUSHER_KEY: z.string().min(1),
  NEXT_PUBLIC_PUSHER_CLUSTER: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

type ServerEnv = z.infer<typeof serverSchema>;
type ClientEnv = z.infer<typeof clientSchema>;

type EnvResult<T> = { ok: true; value: T } | { ok: false; error: string };

let cachedServerEnv: EnvResult<ServerEnv> | null = null;
let cachedClientEnv: EnvResult<ClientEnv> | null = null;

export function getServerEnv(): EnvResult<ServerEnv> {
  if (cachedServerEnv) return cachedServerEnv;

  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    cachedServerEnv = {
      ok: false,
      error: parsed.error.issues.map((issue) => issue.path.join(".")).join(", "),
    };
    return cachedServerEnv;
  }

  cachedServerEnv = { ok: true, value: parsed.data };
  return cachedServerEnv;
}

export function getClientEnv(): EnvResult<ClientEnv> {
  if (cachedClientEnv) return cachedClientEnv;

  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
    NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  });

  if (!parsed.success) {
    cachedClientEnv = {
      ok: false,
      error: parsed.error.issues.map((issue) => issue.path.join(".")).join(", "),
    };
    return cachedClientEnv;
  }

  cachedClientEnv = { ok: true, value: parsed.data };
  return cachedClientEnv;
}

export function getEnvChecks() {
  return {
    PUSHER_APP_ID: Boolean(process.env.PUSHER_APP_ID),
    PUSHER_KEY: Boolean(process.env.PUSHER_KEY),
    PUSHER_SECRET: Boolean(process.env.PUSHER_SECRET),
    PUSHER_CLUSTER: Boolean(process.env.PUSHER_CLUSTER),
    UPSTASH_REDIS_REST_URL: Boolean(process.env.UPSTASH_REDIS_REST_URL),
    UPSTASH_REDIS_REST_TOKEN: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN),
    NEXT_PUBLIC_PUSHER_KEY: Boolean(process.env.NEXT_PUBLIC_PUSHER_KEY),
    NEXT_PUBLIC_PUSHER_CLUSTER: Boolean(process.env.NEXT_PUBLIC_PUSHER_CLUSTER),
    NEXT_PUBLIC_SITE_URL: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  };
}

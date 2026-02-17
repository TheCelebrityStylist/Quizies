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
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

type ServerEnv = z.infer<typeof serverSchema>;

let serverEnv: ServerEnv | null = null;

export const envClient = clientSchema.parse({
  NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY ?? "local-key",
  NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "eu",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

export function getEnvServer(): ServerEnv {
  if (serverEnv) return serverEnv;

  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Server env invalid: ${parsed.error.issues.map((i) => i.path.join(".")).join(", ")}`);
  }

  serverEnv = parsed.data;
  return serverEnv;
}

export function getEnvChecks() {
  const checks = {
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

  return {
    checks,
    ok: Object.values(checks).every(Boolean),
  };
}

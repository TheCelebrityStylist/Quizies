import { z } from "zod";

const serverSchema = z.object({
  PUSHER_APP_ID: z.string().min(1).default("local-app-id"),
  PUSHER_KEY: z.string().min(1).default("local-key"),
  PUSHER_SECRET: z.string().min(1).default("local-secret"),
  PUSHER_CLUSTER: z.string().min(1).default("eu"),

  UPSTASH_REDIS_REST_URL: z.string().url().default("http://localhost:6379"),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).default("local-token"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_PUSHER_KEY: z.string().min(1).default("local-key"),
  NEXT_PUBLIC_PUSHER_CLUSTER: z.string().min(1).default("eu"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

type ServerEnv = z.infer<typeof serverSchema>;

let serverEnv: ServerEnv | null = null;

export const envClient = clientSchema.parse({
  NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
  NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

export function getEnvServer(): ServerEnv {
  if (serverEnv) {
    return serverEnv;
  }

  serverEnv = serverSchema.parse(process.env);
  return serverEnv;
}

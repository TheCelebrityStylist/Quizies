import { Redis } from "@upstash/redis";
import { getServerEnv } from "./env";

let redisClient: Redis | null = null;

export function getRedis() {
  if (redisClient) return redisClient;

  const env = getServerEnv();
  if (!env.ok) {
    throw new Error(`Redis is not configured: ${env.error}`);
  }

  redisClient = new Redis({
    url: env.value.UPSTASH_REDIS_REST_URL,
    token: env.value.UPSTASH_REDIS_REST_TOKEN,
  });
  return redisClient;
}

export const SESSION_TTL_SECONDS = 60 * 60 * 8;

export const redisKeys = {
  session: (code: string) => `quizos:session:${code}`,
  quiz: (slug: string) => `quizos:quiz:${slug}`,
  rate: (scope: string, id: string) => `quizos:rate:${scope}:${id}`,
};

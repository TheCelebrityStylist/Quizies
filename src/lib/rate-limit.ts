import { getRedis, redisKeys } from "./redis";

export async function rateLimit(scope: string, id: string, limit: number, windowSeconds: number) {
  const key = redisKeys.rate(scope, id);
  const count = await getRedis().incr(key);
  if (count === 1) {
    await getRedis().expire(key, windowSeconds);
  }
  return count <= limit;
}

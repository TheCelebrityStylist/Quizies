import { Redis } from "@upstash/redis";
import { envServer } from "./env";

export const redis = new Redis({
  url: envServer.UPSTASH_REDIS_REST_URL,
  token: envServer.UPSTASH_REDIS_REST_TOKEN,
});

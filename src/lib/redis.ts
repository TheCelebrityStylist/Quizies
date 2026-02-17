import { Redis } from "@upstash/redis";
import { getEnvServer } from "./env";

const envServer = getEnvServer();

export const redis = new Redis({
  url: envServer.UPSTASH_REDIS_REST_URL,
  token: envServer.UPSTASH_REDIS_REST_TOKEN,
});

import Pusher from "pusher";
import { getServerEnv } from "./env";

let pusherClient: Pusher | null = null;

export function getPusher() {
  if (pusherClient) return pusherClient;

  const env = getServerEnv();
  if (!env.ok) {
    throw new Error(`Pusher is not configured: ${env.error}`);
  }

  pusherClient = new Pusher({
    appId: env.value.PUSHER_APP_ID,
    key: env.value.PUSHER_KEY,
    secret: env.value.PUSHER_SECRET,
    cluster: env.value.PUSHER_CLUSTER,
    useTLS: true,
  });

  return pusherClient;
}

import Pusher from "pusher";
import { getEnvServer } from "./env";

let pusherClient: Pusher | null = null;

export function getPusher() {
  if (!pusherClient) {
    const env = getEnvServer();
    pusherClient = new Pusher({
      appId: env.PUSHER_APP_ID,
      key: env.PUSHER_KEY,
      secret: env.PUSHER_SECRET,
      cluster: env.PUSHER_CLUSTER,
      useTLS: true,
    });
  }
  return pusherClient;
}

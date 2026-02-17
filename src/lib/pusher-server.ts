import Pusher from "pusher";
import { getEnvServer } from "./env";

const envServer = getEnvServer();

export const pusher = new Pusher({
  appId: envServer.PUSHER_APP_ID,
  key: envServer.PUSHER_KEY,
  secret: envServer.PUSHER_SECRET,
  cluster: envServer.PUSHER_CLUSTER,
  useTLS: true,
});

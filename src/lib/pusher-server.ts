import Pusher from "pusher";
import { envServer } from "./env";

export const pusher = new Pusher({
  appId: envServer.PUSHER_APP_ID,
  key: envServer.PUSHER_KEY,
  secret: envServer.PUSHER_SECRET,
  cluster: envServer.PUSHER_CLUSTER,
  useTLS: true,
});

import dotenv from "dotenv";
dotenv.config();

import { natsWrapper } from "./nats.wrapper";

const PORT = 3000;

const runServer = async () => {
  try {
    // connect to NATS
    await natsWrapper.connect(
      `${process.env.NATS_CLUSTER_ID}`,
      `${process.env.NATS_CLIENT_ID}`,
      `${process.env.NATS_URL}`
    );
    // handle graceful shutdown
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
  } catch (err) {
    console.error(err);
  }
};

runServer();

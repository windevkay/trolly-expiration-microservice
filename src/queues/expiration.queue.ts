import Queue from "bull";

import { ExpirationCompletePublisher } from "../events/publishers/expirationComplete.publisher";
import { natsWrapper } from "../nats.wrapper";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async ({ data }) => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: data.orderId,
  });
});

export { expirationQueue };

import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@stagefirelabs/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}

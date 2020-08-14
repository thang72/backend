import { IEvent } from '@nestjs/cqrs';
import { WebhookEntity } from '@ssc/repository';

export class WebhookDeletedEvent implements IEvent {
  constructor(public readonly webhook: WebhookEntity) {}
}

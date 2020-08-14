import { IEvent } from '@nestjs/cqrs';
import { WebhookEntity } from '@ssc/repository';

export class WebhookCreatedEvent implements IEvent {
  constructor(public readonly webhook: WebhookEntity) {}
}

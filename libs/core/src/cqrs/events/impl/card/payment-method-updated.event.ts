import { IEvent } from '@nestjs/cqrs';
import { CardEntity } from '@ssc/repository';

export class PaymentMethodUpdatedEvent implements IEvent {
  constructor(public readonly card: CardEntity) {}
}

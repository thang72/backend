import { IEvent } from '@nestjs/cqrs';
import { CardEntity } from '@ssc/repository';

export class PaymentMethodAddedEvent implements IEvent {
  constructor(public readonly card: CardEntity) {}
}

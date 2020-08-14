import { IEvent } from '@nestjs/cqrs';
import { PlanEntity } from '@ssc/repository';

export class PlanUpdatedEvent implements IEvent {
  constructor(public readonly plan: PlanEntity) {}
}

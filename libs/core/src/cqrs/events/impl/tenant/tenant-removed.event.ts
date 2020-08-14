import { IEvent } from '@nestjs/cqrs';
import { TenantEntity } from '@ssc/repository/entities';

export class TenantRemovedEvent implements IEvent {
  constructor(public readonly tenant: TenantEntity) {}
}

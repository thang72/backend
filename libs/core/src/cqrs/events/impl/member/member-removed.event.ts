import { IEvent } from '@nestjs/cqrs';
import { TenantMemberEmbed } from '@ssc/repository';

export class MemberRemovedEvent implements IEvent {
  constructor(public readonly member: TenantMemberEmbed) {}
}

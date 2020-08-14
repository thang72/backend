import { IEvent } from '@nestjs/cqrs';
import { TenantMemberEmbed } from '@ssc/repository';

export class MemberAcceptedInvitationEvent implements IEvent {
  constructor(public readonly member: TenantMemberEmbed) {}
}

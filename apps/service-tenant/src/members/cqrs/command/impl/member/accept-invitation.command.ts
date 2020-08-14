import { ICommand } from '@nestjs/cqrs';
import { AcceptMemberInvitationRequest } from '@ssc/proto-schema/tenant';
import { UserEntity } from '@ssc/repository';

export class AcceptInvitationCommand implements ICommand {
  constructor(
    public readonly input: AcceptMemberInvitationRequest,
    public readonly user: UserEntity,
  ) {}
}

import { ICommand } from '@nestjs/cqrs';
import { InviteMemberRequest } from '@ssc/proto-schema/tenant';
import { UserEntity } from '@ssc/repository';

export class InviteMemberCommand implements ICommand {
  constructor(
    public readonly input: InviteMemberRequest,
    public readonly user: UserEntity,
    public readonly tenantId: string,
  ) {}
}

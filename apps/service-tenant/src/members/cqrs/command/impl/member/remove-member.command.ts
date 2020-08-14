import { ICommand } from '@nestjs/cqrs';
import { DeleteMemberRequest } from '@ssc/proto-schema/tenant';
import { UserEntity } from '@ssc/repository';

export class RemoveMemberCommand implements ICommand {
  constructor(
    public readonly input: DeleteMemberRequest,
    public readonly tenantId: string,
    public readonly user: UserEntity,
  ) {}
}

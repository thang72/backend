import { ICommand } from '@nestjs/cqrs';
import { UpdateMemberRequest } from '@ssc/proto-schema/tenant';
import { UserEntity } from '@ssc/repository';

export class UpdateMemberCommand implements ICommand {
  constructor(
    public readonly input: UpdateMemberRequest,
    public readonly tenantId: string,
    public readonly user: UserEntity,
  ) {}
}

import { ICommand } from '@nestjs/cqrs';
import { DeleteTenantRequest } from '@ssc/proto-schema/tenant';
import { UserEntity } from '@ssc/repository';

export class RemoveTenantCommand implements ICommand {
  constructor(
    public readonly input: DeleteTenantRequest,
    public readonly user: UserEntity,
  ) {}
}

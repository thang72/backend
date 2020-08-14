import { ICommand } from '@nestjs/cqrs';
import { UpdateTenantRequest } from '@ssc/proto-schema/tenant';
import { UserEntity } from '@ssc/repository';

export class UpdateTenantCommand implements ICommand {
  constructor(
    public readonly input: UpdateTenantRequest,
    public readonly user: UserEntity,
  ) {}
}

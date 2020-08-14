import { ICommand } from '@nestjs/cqrs';
import { CreateTenantRequest } from '@ssc/proto-schema/tenant';
import { UserEntity } from '@ssc/repository/entities';

export class CreateTenantCommand implements ICommand {
  constructor(
    public readonly input: CreateTenantRequest,
    public readonly user: UserEntity,
  ) {}
}

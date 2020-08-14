import { IQuery } from '@nestjs/cqrs';
import { FindTenantRequest } from '@ssc/proto-schema/tenant';
import { UserEntity } from '@ssc/repository';

export class GetTenantsQuery implements IQuery {
  constructor(
    public readonly where?: FindTenantRequest,
    public readonly user?: UserEntity,
    public readonly inApp?: boolean,
  ) {}
}

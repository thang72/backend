import { IQuery } from '@nestjs/cqrs';
import { ReadTenantRequest } from '@ssc/proto-schema/tenant';
import { UserEntity } from '@ssc/repository';

export class GetTenantQuery implements IQuery {
  constructor(
    public readonly where: ReadTenantRequest,
    public readonly user?: UserEntity,
    public readonly inApp?: boolean,
  ) {}
}

import { IQuery } from '@nestjs/cqrs';
import { TenantAvailableRequest } from '@ssc/proto-schema/tenant';

export class TenantAvailableQuery implements IQuery {
  constructor(public readonly where: TenantAvailableRequest) {}
}

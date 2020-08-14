import { IQuery } from '@nestjs/cqrs';
import { FindSubscriptionsRequest } from '@ssc/proto-schema/billing';

export class GetSubscriptionsQuery implements IQuery {
  constructor(
    public readonly input: FindSubscriptionsRequest,
    public readonly identity: {
      customerId: string;
      tenantId: string;
    },
  ) {}
}

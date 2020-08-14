import { IQuery } from '@nestjs/cqrs';
import { ReadSubscriptionRequest } from '@ssc/proto-schema/billing';

export class GetSubscriptionQuery implements IQuery {
  constructor(public readonly input: ReadSubscriptionRequest) {}
}

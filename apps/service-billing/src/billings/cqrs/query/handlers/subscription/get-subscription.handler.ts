import { InjectStripe } from 'nestjs-stripe';
import * as Stripe from 'stripe';

import { CACHE_MANAGER, CacheStore, Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import {
  ReadSubscriptionResponse,
  TenantSubscription,
} from '@ssc/proto-schema/billing';

import { subsToProtoStripeSubs } from '../../../../../common';
import { GetSubscriptionQuery } from '../../impl';

@QueryHandler(GetSubscriptionQuery)
export class GetSubscriptionHandler
  implements IQueryHandler<GetSubscriptionQuery> {
  logger = new Logger(this.constructor.name);

  public constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @Inject(CACHE_MANAGER) private readonly cacheStore: CacheStore,
  ) {}

  async execute(
    query: GetSubscriptionQuery,
  ): Promise<ReadSubscriptionResponse> {
    this.logger.log(`Async ${query.constructor.name}...`);

    try {
      const { input } = query;

      if (!input.id) {
        throw new RpcException('Missing subscription id input');
      }
      const cacheKey = 'service-payment/subscription/' + input.id;

      // Check cache to see if data exist
      const cacheData = await this.cacheStore.get<TenantSubscription>(cacheKey);
      if (cacheData !== undefined && typeof cacheData !== 'undefined') {
        return {
          subscription: cacheData,
        };
      }

      const sub = await this.stripeClient.subscriptions.retrieve(input.id);
      const subscription = subsToProtoStripeSubs(sub);

      await this.cacheStore.set(cacheKey, subscription, { ttl: 50 });
      return {
        subscription,
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }
}

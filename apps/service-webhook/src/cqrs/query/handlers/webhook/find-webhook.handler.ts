import { CACHE_MANAGER, CacheStore, Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { FindWebhookResponse } from '@ssc/proto-schema/webhook';
import { WebhookRepository } from '@ssc/repository';

import { mapWebhookEntityArrToProto } from '../../../../utitlity';
import { FindWebhookQuery } from '../../impl';

@QueryHandler(FindWebhookQuery)
export class FindWebhookHandler implements IQueryHandler<FindWebhookQuery> {
  logger = new Logger(this.constructor.name);
  repo: WebhookRepository;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheStore: CacheStore) {}

  async execute(query: FindWebhookQuery): Promise<FindWebhookResponse> {
    this.logger.log(`Async ${query.constructor.name}`); // write here
    const { input } = query;
    this.repo = query.repo;

    try {
      let filter = {};
      if (input.filter) {
        filter = JSON.parse(input.filter);
      }

      const webhooks = await this.repo.find({
        conditions: { ...filter },
      });

      return {
        webhooks: mapWebhookEntityArrToProto(webhooks),
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}

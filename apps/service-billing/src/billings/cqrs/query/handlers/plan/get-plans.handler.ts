import { CACHE_MANAGER, CacheStore, Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { FindPlansResponse, Plan } from '@ssc/proto-schema/billing';
import { PlanRepository } from '@ssc/repository';

import { GetPlansQuery } from '../../impl';

@QueryHandler(GetPlansQuery)
export class GetPlansHandler implements IQueryHandler<GetPlansQuery> {
  logger = new Logger(this.constructor.name);

  public constructor(
    private readonly planRepository: PlanRepository,
    @Inject(CACHE_MANAGER) private readonly cacheStore: CacheStore,
  ) {}

  async execute(query: GetPlansQuery): Promise<FindPlansResponse> {
    this.logger.log(`Async ${query.constructor.name}...`);

    try {
      const plans = ((await this.planRepository.find()) as unknown) as Plan[];
      return {
        plans,
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }
}

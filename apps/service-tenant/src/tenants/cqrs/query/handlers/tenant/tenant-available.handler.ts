import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { TenantAvailableResponse } from '@ssc/proto-schema/tenant';
import { TenantRepository } from '@ssc/repository/repositories';

import { TenantAvailableQuery } from '../../impl';

@QueryHandler(TenantAvailableQuery)
export class TenantAvailableHandler
  implements IQueryHandler<TenantAvailableQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly tenantRepository: TenantRepository) {}

  async execute(query: TenantAvailableQuery): Promise<TenantAvailableResponse> {
    this.logger.log(`Async ${query.constructor.name}`); // write here
    const { where } = query;

    try {
      if (!where) {
        throw new RpcException('Missing where inputs');
      }
      const filter = {
        normalizedName: where.identifier,
      };
      const available = await this.tenantRepository.exist({ ...filter });
      return {
        available,
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}

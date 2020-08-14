import { ObjectId } from 'mongodb';

import { mongoParser } from '@juicycleff/repo-orm';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { ReadTenantResponse, Tenant } from '@ssc/proto-schema/tenant';
import { TenantRepository } from '@ssc/repository/repositories';

import { GetTenantQuery } from '../../impl';

@QueryHandler(GetTenantQuery)
export class GetTenantHandler implements IQueryHandler<GetTenantQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly tenantRepository: TenantRepository) {}

  async execute(query: GetTenantQuery): Promise<ReadTenantResponse> {
    this.logger.log(`Async ${query.constructor.name}`); // write here
    const { where, user, inApp } = query;

    try {
      if (!where) {
        throw new RpcException('Missing where inputs');
      }
      const filter = mongoParser(JSON.parse(where.filter));

      const userFilter = inApp
        ? {}
        : {
            members: {
              $elemMatch: {
                $or: [
                  { userId: new ObjectId(user && user.id) },
                  { userId: user.id },
                ],
              },
            },
          };

      const tenant = await this.tenantRepository.findOne({
        ...filter,
        ...userFilter,
      });
      return {
        tenant: (tenant as unknown) as Tenant,
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}

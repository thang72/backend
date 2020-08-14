import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { cleanEmptyProperties } from '@ssc/common';
import { BillingsRpcClientService, TenantUpdatedEvent } from '@ssc/core';
import { Tenant, UpdateTenantResponse } from '@ssc/proto-schema/tenant';
import { TenantRepository } from '@ssc/repository';

import { UpdateTenantCommand } from '../../impl';

/**
 * @class
 */
@CommandHandler(UpdateTenantCommand)
export class UpdateTenantHandler
  implements ICommandHandler<UpdateTenantCommand> {
  logger = new Logger(this.constructor.name);

  /**
   * @constructor
   * @param tenantRepository {TenantRepository}
   * @param eventBus {EventBus}
   * @param billingService {BillingsRpcClientService}
   */
  constructor(
    private readonly tenantRepository: TenantRepository,
    private readonly eventBus: EventBus,
    private readonly billingService: BillingsRpcClientService,
  ) {}

  async execute(command: UpdateTenantCommand): Promise<UpdateTenantResponse> {
    this.logger.log(`'Async '${command.constructor.name}...`);
    const { input, user } = command;

    try {
      /*  Check to make sure input is null and throw an error */
      if (input.data === null || input.id === null) {
        throw new RpcException('Tenant id is missing');
      }

      /*  Check if tenant exist with normalized name */
      const tenantExist = await this.tenantRepository.exist({
        _id: input.id,
        members: {
          $elemMatch: {
            id: user.id,
          },
        },
      });

      if (tenantExist) {
        throw new RpcException('Tenant name is unavailable, try another name');
      }

      let updateSetting = {};
      let updateName = {};
      if (input.data.name) {
        updateName = {
          $set: {
            name: input.data.name,
          },
        };
      }
      if (input.data.name) {
        updateSetting = {
          $set: {
            settings: cleanEmptyProperties(input.data.settings),
          },
        };
      }

      /*  Update tenant */
      const tenant = await this.tenantRepository.findOneAndUpdate({
        conditions: {
          id: input.id,
        },
        updates: {
          ...updateName,
          ...updateSetting,
        },
        upsert: true,
      });

      /*  Publish to the event store of our newly created tenant */
      await this.eventBus.publish(new TenantUpdatedEvent(tenant));
      return {
        tenant: (tenant as unknown) as Tenant,
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }
  }
}

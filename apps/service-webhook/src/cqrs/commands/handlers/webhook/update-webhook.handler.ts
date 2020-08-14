import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { WebhookUpdatedEvent } from '@ssc/core';
import { CreateWebhookResponse } from '@ssc/proto-schema/webhook';
import { WebhookRepository } from '@ssc/repository';

import { UpdateWebhookCommand } from '../../';
import { mapWebhookEntityToProto } from '../../../../utitlity';

/**
 * @implements {ICommandHandler<UpdateWebhookCommand>}
 * @classdesc CQRS command to request webhook update
 * @class
 */
@CommandHandler(UpdateWebhookCommand)
export class UpdateWebhookHandler
  implements ICommandHandler<UpdateWebhookCommand> {
  logger = new Logger(this.constructor.name);
  repo: WebhookRepository;

  /**
   * @constructor
   * @param repo
   * @param eventBus
   */
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: UpdateWebhookCommand): Promise<CreateWebhookResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { cmd } = command;
    this.repo = command.repo;

    try {
      if (!cmd) {
        throw new RpcException('Missing update fields');
      }
      if (!cmd.id) {
        throw new RpcException('Missing entity to update ID');
      }

      const { id, ...rest } = cmd;
      const resp = await this.repo.findOneByIdAndUpdate(cmd.id, {
        updates: {
          ...rest,
        },
      });

      /*  Publish to the event store of our newly created access token */
      await this.eventBus.publish(new WebhookUpdatedEvent(resp));

      return {
        webhook: mapWebhookEntityToProto(resp),
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }
}

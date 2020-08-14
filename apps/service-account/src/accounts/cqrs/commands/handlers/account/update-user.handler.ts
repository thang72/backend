import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { cleanEmptyProperties } from '@ssc/common';
import { UserCreatedEvent } from '@ssc/core';
import * as Account from '@ssc/proto-schema/account';
import { UserRepository } from '@ssc/repository';

import { UpdateUserCommand } from '../../impl';

/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<Account.UpdateResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { data, id } = command;

    try {
      const update = cleanEmptyProperties(data);
      const user = await this.userRepository.findOneByIdAndUpdate(id, {
        updates: {
          $set: { ...update },
        },
      });
      this.eventBus.publish(new UserCreatedEvent(user));
      return {
        // @ts-ignore
        user: user as Account.User,
      };
    } catch (error) {
      this.logger.log(error);
      throw new RpcException(error);
    }
  }
}

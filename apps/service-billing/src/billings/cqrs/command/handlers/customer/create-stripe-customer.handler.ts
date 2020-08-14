import { InjectStripe } from 'nestjs-stripe';
import * as Stripe from 'stripe';

import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Customer, StripeUserCreatedEvent } from '@ssc/core';
import { CreateCustomerResponse } from '@ssc/proto-schema/billing';

import { CreateStripeCustomerCommand } from '../../impl';

/**
 * @class
 */
@CommandHandler(CreateStripeCustomerCommand)
export class CreateStripeCustomerHandler
  implements ICommandHandler<CreateStripeCustomerCommand> {
  logger = new Logger(this.constructor.name);

  /**
   * @constructor
   * @param stripeClient
   * @param eventBus
   */
  public constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: CreateStripeCustomerCommand,
  ): Promise<CreateCustomerResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { input } = command;

    try {
      if (input === null) {
        // Check to make sure input is not null
        throw new RpcException('Current user input missing'); // Throw an input error
      }

      // Check if tenant exist with normalized name
      const customer = await this.stripeClient.customers.create({
        email: input.email,
        name: input.name,
      });

      // @ts-ignore
      const customerMod: Customer = {
        ...customer,
      };

      await this.eventBus.publish(new StripeUserCreatedEvent(customerMod));
      return {
        customer: {
          email: customerMod.email,
          name: customerMod.name,
          id: customerMod.id,
        },
      };
    } catch (error) {
      this.logger.log(error);
      throw new RpcException(error);
    }
  }
}

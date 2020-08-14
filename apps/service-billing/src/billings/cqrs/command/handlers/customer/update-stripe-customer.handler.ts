import { InjectStripe } from 'nestjs-stripe';
import * as Stripe from 'stripe';

import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Customer, StripeUserUpdatedEvent } from '@ssc/core';

import { UpdateStripeCustomerCommand } from '../../impl';

@CommandHandler(UpdateStripeCustomerCommand)
export class UpdateStripeCustomerHandler
  implements ICommandHandler<UpdateStripeCustomerCommand> {
  logger = new Logger(this.constructor.name);

  public constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateStripeCustomerCommand): Promise<Customer> {
    this.logger.log(`Async ${this.constructor.name}...`);
    const { data, id } = command;

    try {
      if (id === null || data === null) {
        // Check to make sure input is not null
        throw new RpcException(
          'Customer id or data missing in your update request',
        ); // Throw an input error
      }

      const customerExist = await this.stripeClient.customers.retrieve(id);
      if (!customerExist) {
        // Check to make sure input is not null
        throw new RpcException('Customer not found'); // Throw an input error
      }
      const customer = await this.stripeClient.customers.update(id, data);

      // @ts-ignore
      const customerMod: Customer = {
        ...customer,
      };

      this.eventBus.publish(new StripeUserUpdatedEvent(customerMod));
      return customerMod;
    } catch (error) {
      this.logger.log(error);
      throw new RpcException(error);
    }
  }
}

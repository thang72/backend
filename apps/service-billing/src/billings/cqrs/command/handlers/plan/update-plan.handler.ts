import { InjectStripe } from 'nestjs-stripe';
import * as Stripe from 'stripe';

import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { CreatePlanResponse } from '@ssc/proto-schema/billing';

import { UpdatePlanCommand } from '../../impl';

@CommandHandler(UpdatePlanCommand)
export class UpdatePlanHandler implements ICommandHandler<UpdatePlanCommand> {
  logger = new Logger(this.constructor.name);

  public constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdatePlanCommand): Promise<CreatePlanResponse> {
    // TODO: Tobe implemented
    throw new RpcException('Not implemented');
  }
}

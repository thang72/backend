import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store';
import { Module } from '@nestjs/common';
import { PlanRepository } from '@ssc/repository';

import { CardsModule } from '../cards/cards.module';
import { PlansModule } from '../plans/plans.module';
import { BillingsController } from './billings.controller';
import {
  CustomerCommandHandlers,
  InvoiceQueryHandlers,
  PlanCommandHandlers,
  PlanQueryHandlers,
  SubscriptionCommandHandlers,
  SubscriptionQueryHandlers,
} from './cqrs';

@Module({
  imports: [
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$ce-billing',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-billing',
        },
      ],
      eventHandlers: {},
    }),
    CardsModule,
    PlansModule,
  ],
  controllers: [BillingsController],
  providers: [
    PlanRepository,
    ...CustomerCommandHandlers,
    ...SubscriptionCommandHandlers,
    ...SubscriptionQueryHandlers,
    ...PlanCommandHandlers,
    ...PlanQueryHandlers,
    ...InvoiceQueryHandlers,
  ],
})
export class BillingsModule {}

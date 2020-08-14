import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  AccountEventHandlers,
  BillingEventHandlers,
  BillingsRpcClientService,
  EmailVerifiedEvent,
  JwtConfigService,
  RolesRpcClientService,
  StripeUserCreatedEvent,
  UserLoggedInEvent,
  UserRegisteredEvent,
} from '@ssc/core';
import { UserRepository } from '@ssc/repository';

import { AccountsController } from './accounts.controller';
import { AccountCommandHandlers, AccountQueryHandlers } from './cqrs';
import { AccountSagas } from './sagas';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$ce-account',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-account',
        },
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-billing',
        },
      ],
      eventHandlers: {
        UserLoggedInEvent: (data) => new UserLoggedInEvent(data),
        UserRegisteredEvent: (data) => new UserRegisteredEvent(data),
        EmailVerifiedEvent: (data) => new EmailVerifiedEvent(data),
        StripeUserCreatedEvent: (data) => new StripeUserCreatedEvent(data),
      },
    }),
  ],
  providers: [
    AccountSagas,
    RolesRpcClientService,
    BillingsRpcClientService,
    ...AccountCommandHandlers,
    ...AccountQueryHandlers,
    ...AccountEventHandlers,
    ...BillingEventHandlers,
    UserRepository,
  ],
  controllers: [AccountsController],
})
export class AccountsModule {}

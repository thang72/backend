import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import {
  EmailVerifiedEvent,
  ForgotPasswordSentEvent,
  UserLoggedInEvent,
  UserRegisteredEvent,
  VerificationEmailSentEvent,
} from '@ssc/core';

import { BullConfigService } from '../configs/bull-config.service';
import { EmailService } from './email.service';
import { AuthProcess } from './queue';
import { AuthSagas } from './sagas';

@Module({
  imports: [
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$ce-account',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-account',
        },
      ],
      eventHandlers: {
        UserLoggedInEvent: (data) => new UserLoggedInEvent(data),
        UserRegisteredEvent: (data) => new UserRegisteredEvent(data),
        EmailVerifiedEvent: (data) => new EmailVerifiedEvent(data),
        VerificationEmailSentEvent: (data) =>
          new VerificationEmailSentEvent(data),
        ForgotPasswordSentEvent: (data) => new ForgotPasswordSentEvent(data),
      },
    }),
    BullModule.registerQueueAsync({
      name: 'notification_queue',
      useClass: BullConfigService,
    }),
  ],
  providers: [EmailService, AuthProcess, AuthSagas],
})
export class EmailModule {}

import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store';
import { Module } from '@nestjs/common';
import { WebhookEventHandlers } from '@ssc/core';
import { WebhookRepository } from '@ssc/repository';

import { WebhookCommandHandlers, WebhookQueryHandlers } from '../cqrs';
import { WebhookController } from './webhook.controller';

@Module({
  imports: [
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$ce-webhook',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-webhook',
        },
      ],
      eventHandlers: null,
    }),
  ],
  providers: [
    ...WebhookEventHandlers,
    ...WebhookQueryHandlers,
    ...WebhookCommandHandlers,
    WebhookRepository,
  ],
  controllers: [WebhookController],
})
export class WebhookModule {}

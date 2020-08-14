import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store';
import { Module } from '@nestjs/common';
import { AccessTokenRepository } from '@ssc/repository';

import { AccessTokenController } from './access-token.controller';
import { AccessTokenCommandHandlers } from './cqrs/commands/handlers/access-token';
import { AccessTokenQueryHandlers } from './cqrs/query/handlers/access-token';

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
      eventHandlers: {},
    }),
  ],
  controllers: [AccessTokenController],
  providers: [
    AccessTokenRepository,
    ...AccessTokenQueryHandlers,
    ...AccessTokenCommandHandlers,
  ],
})
export class AccessTokenModule {}

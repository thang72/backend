import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store';
import { Module } from '@nestjs/common';
import {
  BillingsRpcClientService,
  RolesRpcClientService,
  TenantCreatedEvent,
  TenantEventHandlers,
} from '@ssc/core';
import { TenantRepository } from '@ssc/repository';

import { TenantCommandHandlers, TenantQueryHandlers } from './cqrs';
import { TenantSagas } from './sagas';
import { TenantsController } from './tenants.controller';

@Module({
  imports: [
    EventStoreModule.registerFeature({
      featureStreamName: '$ce-tenant',
      type: 'event-store',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-tenant',
        },
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-point',
        },
      ],
      eventHandlers: {
        TenantCreatedEvent: (data) => new TenantCreatedEvent(data),
      },
    }),
  ],
  providers: [
    TenantRepository,
    BillingsRpcClientService,
    RolesRpcClientService,
    ...TenantCommandHandlers,
    ...TenantEventHandlers,
    ...TenantQueryHandlers,
    TenantSagas,
  ],
  controllers: [TenantsController],
})
export class TenantsModule {}

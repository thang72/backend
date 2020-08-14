import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CookieSerializer } from '@ssc/common';
import {
  CoreModule,
  RolesRpcClientService,
  ServiceRegistryModule,
} from '@ssc/core';

import { AccessTokenModule } from './access-token/access-token.module';
import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingsModule } from './billings/billings.module';
import { CardsModule } from './cards/cards.module';
import { GlobalClientModule } from './common/global-client.module';
import { GqlConfigService } from './gql-config.service';
import { NotificationsModule } from './notifications/notifications.module';
import { PlansModule } from './plans/plans.module';
import { RolesModule } from './roles/roles.module';
import { SeedModule } from './seed.module';
import { TenantMembersModule } from './tenant-members/tenant-members.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    SeedModule,
    ServiceRegistryModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    GlobalClientModule,
    CoreModule,
    RolesModule,
    AccountsModule,
    TenantsModule,
    WebhooksModule,
    BillingsModule,
    CardsModule,
    PlansModule,
    NotificationsModule,
    UsersModule,
    TenantMembersModule,
    AccessTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, CookieSerializer, RolesRpcClientService],
})
export class AppModule {}

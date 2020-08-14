import { MongoModule } from '@juicycleff/repo-orm';
import { Module } from '@nestjs/common';
import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@ssc/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    MongoModule.registerAsync({
      useClass: MongoConfigService,
    }),
    TenantsModule,
    MembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

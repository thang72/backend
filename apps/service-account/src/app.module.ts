import { MongoModule } from '@juicycleff/repo-orm';
import { Module } from '@nestjs/common';
import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@ssc/core';

import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    MongoModule.registerAsync({
      useClass: MongoConfigService,
    }),
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

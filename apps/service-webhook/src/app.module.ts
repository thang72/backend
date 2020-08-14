import { MongoModule } from '@juicycleff/repo-orm';
import { Module } from '@nestjs/common';
import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@ssc/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    MongoModule.registerAsync({
      useClass: MongoConfigService,
    }),
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

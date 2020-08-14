import { StripeModule } from 'nestjs-stripe';

import { MongoModule } from '@juicycleff/repo-orm';
import { Module } from '@nestjs/common';
import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@ssc/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingsModule } from './billings/billings.module';
import { CardsModule } from './cards/cards.module';
import { StripeModuleConfigService } from './common';
import { CommonModule } from './common/common.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [
    ServiceRegistryModule,
    CommonModule,
    CoreModule,
    MongoModule.registerAsync({
      useClass: MongoConfigService,
    }),
    StripeModule.forRootAsync({
      useClass: StripeModuleConfigService,
    }),
    CardsModule,
    BillingsModule,
    PlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { NestCasbinModule } from 'nestjs-casbin';

import { MongoModule } from '@juicycleff/repo-orm';
import { Module } from '@nestjs/common';
import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@ssc/core';

import { AccessTokenModule } from './access-token/access-token.module';
import { AdapterProviderModule } from './adapter.provider';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CasbinUserConfigService } from './casbin-config';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    MongoModule.registerAsync({
      useClass: MongoConfigService,
    }),
    NestCasbinModule.registerAsync({
      imports: [AdapterProviderModule],
      useClass: CasbinUserConfigService,
    }),
    AccessTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

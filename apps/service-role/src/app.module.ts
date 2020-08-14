import { NestCasbinModule } from 'nestjs-casbin';

import { Module } from '@nestjs/common';
import { CoreModule, ServiceRegistryModule } from '@ssc/core';

import { AdapterProviderModule } from './adapter.provider';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CasbinUserConfigService } from './casbin-config';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    NestCasbinModule.registerAsync({
      imports: [AdapterProviderModule],
      useClass: CasbinUserConfigService,
    }),
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

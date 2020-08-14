import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module } from '@nestjs/common';
import { CoreModule, ServiceRegistryModule } from '@ssc/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendgridConfigService } from './configs/sendgrid-config.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    SendGridModule.forRootAsync({
      useClass: SendgridConfigService,
    }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

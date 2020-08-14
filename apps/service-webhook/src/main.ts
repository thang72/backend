import { NestCloud } from '@nestcloud/core';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { microserviceSetup } from '@ssc/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = NestCloud.create(
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    ),
  );

  await microserviceSetup(app, 'proto/webhook.proto', {
    enableNats: false,
    enableMqtt: false,
  });
}
(() => bootstrap())();

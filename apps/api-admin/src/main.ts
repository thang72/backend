import * as getPort from 'get-port';

import { NestCloud } from '@nestcloud/core';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import {
  AppUtils,
  authSetup,
  bloodTearsMiddleware,
  corsOptions,
  setupSwagger,
} from '@ssc/common';
import {
  TenantDatabaseStrategy,
  enableMultiTenancy,
} from '@ssc/core/mutiltenancy';

import { AppModule } from './app.module';
import { SERVICE_NAME } from './constants';

async function bootstrap() {
  const app = NestCloud.create(await NestFactory.create(AppModule));

  app.enableCors(corsOptions);
  app.use(bloodTearsMiddleware);
  AppUtils.killAppWithGrace(app);

  /** Authentication middleware for multi support */
  authSetup(app, true);

  /** Multitenant middleware for multitenancy database strategy support */
  app.use(
    enableMultiTenancy({
      enabled: true,
      tenantResolver: {
        resolverType: 'Header',
        headerKeys: {
          tenant: 'x-tenant-id',
          apiKey: 'x-tenant-key',
        },
        requiresToken: true,
      },
      databaseStrategy: TenantDatabaseStrategy.DataIsolation,
    }),
  );

  const document = SwaggerModule.createDocument(app, setupSwagger());
  SwaggerModule.setup('docs', app, document);

  const port = await getPort();
  await app.listen(NestCloud.global.boot.get('service.port', port));
  Logger.log(`${SERVICE_NAME} running on: ${await app.getUrl()}`, 'Bootstrap');
}

(async () => await bootstrap())();

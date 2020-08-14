import { ConsulConfig, InjectConfig } from '@nestcloud/config';
import {
  BullModuleOptions,
  BullOptionsFactory,
} from '@nestjs/bull/dist/interfaces/bull-module-options.interface';
import { Injectable } from '@nestjs/common';
import { ConsulDatabaseConfig } from '@ssc/common';

@Injectable()
export class BullConfigService implements BullOptionsFactory {
  constructor(@InjectConfig() private readonly config: ConsulConfig) {}

  createBullOptions(): Promise<BullModuleOptions> | BullModuleOptions {
    const database = this.config.get<ConsulDatabaseConfig>('database');
    return {
      name: 'notification_queue',
      redis: {
        host: database.redis.host,
        port: parseInt(database.redis.port, 10),
        password: database.redis.password,
      },
    };
  }
}

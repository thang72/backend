import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CookieSerializer } from '@ssc/common';
import {
  JwtConfigService,
  MemberEventHandlers,
  RolesRpcClientService,
} from '@ssc/core';
import { TenantRepository } from '@ssc/repository';

import { MemberCommandHandlers, MemberQueryHandlers } from './cqrs';
import { MembersController } from './members.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  providers: [
    TenantRepository,
    RolesRpcClientService,
    CookieSerializer,
    ...MemberCommandHandlers,
    ...MemberEventHandlers,
    ...MemberQueryHandlers,
  ],
  controllers: [MembersController],
})
export class MembersModule {}

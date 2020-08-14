import { Module } from '@nestjs/common';
import { AccountsRpcClientService } from '@ssc/core';

import { UsersMutationResolver } from './users-mutation.resolver';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [AccountsRpcClientService, UsersResolver, UsersMutationResolver],
})
export class UsersModule {}

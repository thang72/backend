import { DataSource } from 'apollo-datasource';
import { Context } from 'apollo-server-core/src/types';
import { Request as ExpressRequest } from 'express';
import { PassportContext, PassportSubscriptionContext } from 'graphql-passport';

import { TenantInfo } from '@ssc/core/mutiltenancy';
import {
  AccessTokenRpcClientService,
  AccountsRpcClientService,
  BillingsRpcClientService,
  RolesRpcClientService,
  TenantsRpcClientService,
  WebhooksRpcClientService,
} from '@ssc/core/services';
import { UserEntity } from '@ssc/repository';

export interface IRequest extends ExpressRequest {
  tenantInfo?: TenantInfo;
}
export interface GqlContext
  extends Partial<PassportContext<UserEntity, IRequest> & Context> {
  connection?: any;
  rpc: {
    account: AccountsRpcClientService;
    tenant: TenantsRpcClientService;
    accessToken: AccessTokenRpcClientService;
    role: RolesRpcClientService;
    billing: BillingsRpcClientService;
    webhook: WebhooksRpcClientService;
  };
}

export interface GqlSubscriptionContext
  extends PassportSubscriptionContext<UserEntity, ExpressRequest>,
    DataSource {}

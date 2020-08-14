import { join } from 'path';

import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc';
import { Injectable } from '@nestjs/common';
import { TenantServiceClient } from '@ssc/proto-schema/tenant';

import { SERVICE_LIST } from '../../constants';

@Injectable()
export class TenantsRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.tenant.consulName,
    package: SERVICE_LIST.tenant.package,
    protoPath: SERVICE_LIST.tenant.protoPath,
  })
  private readonly client: GrpcClient;

  @Service(SERVICE_LIST.tenant.service, {
    service: SERVICE_LIST.tenant.consulName,
    package: SERVICE_LIST.tenant.package,
    protoPath: SERVICE_LIST.tenant.protoPath,
  })
  public svc: TenantServiceClient<any>;
}

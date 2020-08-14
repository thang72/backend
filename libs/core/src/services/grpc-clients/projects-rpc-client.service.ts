import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc';
import { Injectable } from '@nestjs/common';
import { ProjectServiceClient } from '@ssc/proto-schema/project';

import { SERVICE_LIST } from '../../constants';

@Injectable()
export class ProjectsRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.project.consulName,
    package: SERVICE_LIST.project.package,
    protoPath: SERVICE_LIST.project.protoPath,
  })
  private readonly client: GrpcClient;

  @Service(SERVICE_LIST.project.service, {
    service: SERVICE_LIST.project.consulName,
    package: SERVICE_LIST.project.package,
    protoPath: SERVICE_LIST.project.protoPath,
  })
  public svc: ProjectServiceClient<any>;
}

import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { getIdentityFromCtx } from '@ssc/core';
import {
  CreateProjectRequest,
  CreateProjectResponse,
  DeleteProjectRequest,
  DeleteProjectResponse,
  FindProjectsRequest,
  FindProjectsResponse,
  ProjectService,
  ReadProjectRequest,
  ReadProjectResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from '@ssc/proto-schema/project';
import { ProjectRepository } from '@ssc/repository';

import {
  CreateProjectCommand,
  DeleteProjectCommand,
  GetProjectQuery,
  GetProjectsQuery,
  UpdateProjectCommand,
} from './cqrs';

@Controller('projects')
export class ProjectsController implements ProjectService<any> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly spaceRepository: ProjectRepository,
  ) {}

  @GrpcMethod('ProjectService')
  createProject(
    request: CreateProjectRequest,
    ctx: any,
  ): Promise<CreateProjectResponse> {
    const { user } = getIdentityFromCtx(ctx);
    return this.commandBus.execute(
      new CreateProjectCommand(request, user, this.spaceRepository),
    );
  }

  @GrpcMethod('ProjectService')
  deleteProject(
    request: DeleteProjectRequest,
    ctx: any,
  ): Promise<DeleteProjectResponse> {
    const { user } = getIdentityFromCtx(ctx);
    return this.commandBus.execute(
      new DeleteProjectCommand(request, user, this.spaceRepository),
    );
  }

  @GrpcMethod('ProjectService')
  findProjects(
    request: FindProjectsRequest,
    ctx: any,
  ): Promise<FindProjectsResponse> {
    return this.queryBus.execute(
      new GetProjectsQuery(this.spaceRepository, request),
    );
  }

  @GrpcMethod('ProjectService')
  readProject(
    request: ReadProjectRequest,
    ctx: any,
  ): Promise<ReadProjectResponse> {
    return this.queryBus.execute(
      new GetProjectQuery(request, this.spaceRepository),
    );
  }

  @GrpcMethod('ProjectService')
  updateProject(
    request: UpdateProjectRequest,
    ctx: any,
  ): Promise<UpdateProjectResponse> {
    const { user } = getIdentityFromCtx(ctx);
    return this.commandBus.execute(
      new UpdateProjectCommand(request, user, this.spaceRepository),
    );
  }
}

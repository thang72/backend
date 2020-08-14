import { IQuery } from '@nestjs/cqrs';
import { FindProjectsRequest } from '@ssc/proto-schema/project';
import { ProjectRepository } from '@ssc/repository';

export class GetProjectsQuery implements IQuery {
  constructor(
    public readonly projectRepository: ProjectRepository,
    public readonly input?: FindProjectsRequest,
  ) {}
}

import { IQuery } from '@nestjs/cqrs';
import { ReadProjectRequest } from '@ssc/proto-schema/project';
import { ProjectRepository } from '@ssc/repository';

export class GetProjectQuery implements IQuery {
  constructor(
    public readonly input: ReadProjectRequest,
    public readonly projectRepository: ProjectRepository,
  ) {}
}

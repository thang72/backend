import { ICommand } from '@nestjs/cqrs';
import { CreateProjectRequest } from '@ssc/proto-schema/project';
import { ProjectRepository, UserEntity } from '@ssc/repository';

export class CreateProjectCommand implements ICommand {
  constructor(
    public readonly input: CreateProjectRequest,
    public readonly user: UserEntity,
    public readonly projectRepository: ProjectRepository,
  ) {}
}

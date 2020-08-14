import { ICommand } from '@nestjs/cqrs';
import { UpdateProjectRequest } from '@ssc/proto-schema/project';
import { ProjectRepository, UserEntity } from '@ssc/repository';

export class UpdateProjectCommand implements ICommand {
  constructor(
    public readonly input: UpdateProjectRequest,
    public readonly user: UserEntity,
    public readonly projectRepository: ProjectRepository,
  ) {}
}

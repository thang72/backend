import { ICommand } from '@nestjs/cqrs';
import { DeleteProjectRequest } from '@ssc/proto-schema/project';
import { ProjectRepository, UserEntity } from '@ssc/repository';

export class DeleteProjectCommand implements ICommand {
  constructor(
    public readonly input: DeleteProjectRequest,
    public readonly user: UserEntity,
    public readonly projectRepository: ProjectRepository,
  ) {}
}

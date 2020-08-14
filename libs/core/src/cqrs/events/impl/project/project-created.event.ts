import { IEvent } from '@nestjs/cqrs';
import { ProjectEntity } from '@ssc/repository';

export class ProjectCreatedEvent implements IEvent {
  constructor(public readonly project: ProjectEntity) {}
}

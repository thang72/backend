import { IEvent } from '@nestjs/cqrs';
import { ProjectEntity } from '@ssc/repository';

export class ProjectUpdatedEvent implements IEvent {
  constructor(public readonly project: ProjectEntity) {}
}

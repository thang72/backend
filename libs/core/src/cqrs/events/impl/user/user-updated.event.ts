import { IEvent } from '@nestjs/cqrs';
import { UserEntity } from '@ssc/repository';

export class UserUpdatedEvent implements IEvent {
  constructor(public readonly user: UserEntity) {}
}

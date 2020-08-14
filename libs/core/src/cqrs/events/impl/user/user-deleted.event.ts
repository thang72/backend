import { IEvent } from '@nestjs/cqrs';
import { UserEntity } from '@ssc/repository';

export class UserDeletedEvent implements IEvent {
  constructor(public readonly user: UserEntity) {}
}

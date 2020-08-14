import { IEvent } from '@nestjs/cqrs';
import { UserEntity } from '@ssc/repository/entities';

export class UserPasswordUpdatedEvent implements IEvent {
  constructor(public readonly user: UserEntity) {}
}

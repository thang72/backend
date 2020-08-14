import { IEvent } from '@nestjs/cqrs';
import { UserEntity } from '@ssc/repository';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly auth: UserEntity) {}
}

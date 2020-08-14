import { IEvent } from '@nestjs/cqrs';
import { UserEntity } from '@ssc/repository/entities';

export class UserRegisteredEvent implements IEvent {
  constructor(
    public readonly user: UserEntity & {
      activationLink?: string;
      service?: 'social' | 'local';
    },
  ) {}
}

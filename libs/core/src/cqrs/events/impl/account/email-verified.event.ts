import { IEvent } from '@nestjs/cqrs';
import { UserEntity } from '@ssc/repository/entities';

export class EmailVerifiedEvent implements IEvent {
  constructor(public readonly user: UserEntity) {}
}

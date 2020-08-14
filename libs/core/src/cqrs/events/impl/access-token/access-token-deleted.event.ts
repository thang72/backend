import { IEvent } from '@nestjs/cqrs';
import { AccessTokenEntity } from '@ssc/repository';

export class AccessTokenDeletedEvent implements IEvent {
  constructor(public readonly accessToken: AccessTokenEntity) {}
}

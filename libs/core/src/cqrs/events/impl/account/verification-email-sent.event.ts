import { IEvent } from '@nestjs/cqrs';
import { UserEntity } from '@ssc/repository/entities';

export class VerificationEmailSentEvent implements IEvent {
  constructor(public readonly user: UserEntity & { activationLink?: string }) {}
}

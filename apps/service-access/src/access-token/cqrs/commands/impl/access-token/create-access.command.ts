import { ICommand } from '@nestjs/cqrs';
import { CreateAccessRequest } from '@ssc/proto-schema/access';
import { UserEntity } from '@ssc/repository';

export class CreateAccessCommand implements ICommand {
  constructor(
    public readonly cmd: CreateAccessRequest,
    public readonly user: UserEntity,
  ) {}
}

import { ICommand } from '@nestjs/cqrs';
import { CreateRequest } from '@ssc/proto-schema/account';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly cmd: CreateRequest) {}
}

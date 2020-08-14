import { ObjectId } from 'mongodb';

import { ICommand } from '@nestjs/cqrs';
import * as Account from '@ssc/proto-schema/account';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly id: string | ObjectId,
    public readonly data: Partial<Account.UpdateRequest>,
  ) {}
}

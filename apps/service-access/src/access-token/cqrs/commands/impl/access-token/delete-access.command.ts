import { ICommand } from '@nestjs/cqrs';
import { DeleteAccessRequest } from '@ssc/proto-schema/access';

export class DeleteAccessCommand implements ICommand {
  constructor(
    public readonly cmd: DeleteAccessRequest,
    public readonly tenantId: string,
  ) {}
}

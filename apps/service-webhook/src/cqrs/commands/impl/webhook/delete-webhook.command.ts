import { ICommand } from '@nestjs/cqrs';
import { DeleteWebhookRequest } from '@ssc/proto-schema/webhook';
import { WebhookRepository } from '@ssc/repository';

export class DeleteWebhookCommand implements ICommand {
  constructor(
    public readonly cmd: DeleteWebhookRequest,
    public readonly repo: WebhookRepository,
  ) {}
}

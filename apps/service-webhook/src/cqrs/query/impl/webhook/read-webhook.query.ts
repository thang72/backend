import { IQuery } from '@nestjs/cqrs';
import { ReadWebhookRequest } from '@ssc/proto-schema/webhook';
import { WebhookRepository } from '@ssc/repository';

export class ReadWebhookQuery implements IQuery {
  constructor(
    public readonly input: ReadWebhookRequest,
    public readonly repo: WebhookRepository,
  ) {}
}

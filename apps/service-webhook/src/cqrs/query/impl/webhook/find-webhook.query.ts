import { IQuery } from '@nestjs/cqrs';
import { FindWebhookRequest } from '@ssc/proto-schema/webhook';
import { WebhookRepository } from '@ssc/repository';

export class FindWebhookQuery implements IQuery {
  constructor(
    public readonly input: FindWebhookRequest,
    public readonly repo: WebhookRepository,
  ) {}
}

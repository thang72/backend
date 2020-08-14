import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { getIdentityFromCtx } from '@ssc/core';
import {
  CreateWebhookRequest,
  CreateWebhookResponse,
  DeleteWebhookRequest,
  DeleteWebhookResponse,
  FindWebhookRequest,
  FindWebhookResponse,
  ReadWebhookRequest,
  ReadWebhookResponse,
  UpdateWebhookRequest,
  UpdateWebhookResponse,
  WebhookService,
} from '@ssc/proto-schema/webhook';
import { WebhookRepository } from '@ssc/repository';

import {
  CreateWebhookCommand,
  DeleteWebhookCommand,
  FindWebhookQuery,
  ReadWebhookQuery,
  UpdateWebhookCommand,
} from '../cqrs';

@Controller('webhook')
export class WebhookController implements WebhookService<any> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly repo: WebhookRepository,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @GrpcMethod('WebhookService')
  createWebhook(
    request: CreateWebhookRequest,
    ctx: any,
  ): Promise<CreateWebhookResponse> {
    const { user } = getIdentityFromCtx(ctx);
    return this.commandBus.execute(
      new CreateWebhookCommand(request, this.repo, user),
    );
  }

  @GrpcMethod('WebhookService')
  deleteWebhook(
    request: DeleteWebhookRequest,
    ctx: any,
  ): Promise<DeleteWebhookResponse> {
    return this.commandBus.execute(
      new DeleteWebhookCommand(request, this.repo),
    );
  }

  @GrpcMethod('WebhookService')
  findWebhook(
    request: FindWebhookRequest,
    ctx: any,
  ): Promise<FindWebhookResponse> {
    return this.queryBus.execute(new FindWebhookQuery(request, this.repo));
  }

  @GrpcMethod('WebhookService')
  readWebhook(
    request: ReadWebhookRequest,
    ctx: any,
  ): Promise<ReadWebhookResponse> {
    return this.queryBus.execute(new ReadWebhookQuery(request, this.repo));
  }

  @GrpcMethod('WebhookService')
  updateWebhook(
    request: UpdateWebhookRequest,
    ctx: any,
  ): Promise<UpdateWebhookResponse> {
    return this.commandBus.execute(
      new UpdateWebhookCommand(request, this.repo),
    );
  }
}

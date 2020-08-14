import { UseGuards } from '@nestjs/common';
import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { WebhookAuthEnum } from '@ssc/contracts';
import { GqlAuthGuard, GqlContext, Resource, setRpcContext } from '@ssc/core';
import {
  CreateWebhookRequest,
  UpdateWebhookRequest,
  Webhook as RpcWebhook,
} from '@ssc/proto-schema/webhook';

import {
  CreateWebhookInput,
  DeleteWebhookInput,
  UpdateWebhookInput,
  Webhook,
  WebhookMutations,
} from './types';

@Resolver(() => WebhookMutations)
export class WebhooksMutationResolver {
  @Resource({
    name: 'webhook',
    identify: 'webhook',
    roles: ['owner', 'admin'],
    action: 'create',
  })
  @UseGuards(GqlAuthGuard)
  @ResolveField(() => Webhook)
  async create(
    @Args('input') input: CreateWebhookInput,
    @Context() ctx: GqlContext,
  ): Promise<RpcWebhook> {
    const cont: any = {
      ...input,
    };

    if (input.auth.apiKey) {
      cont.auth = {
        ...input.auth.apiKey,
      };
    } else if (input.auth.basic) {
      cont.auth = {
        ...input.auth.basic,
      };
    } else if (input.auth.oauth2) {
      cont.auth = {
        ...input.auth.oauth2,
      };
    } else if (input.auth.token) {
      cont.auth = {
        ...input.auth.token,
      };
    } else {
      cont.auth = {
        type: WebhookAuthEnum.NONE,
      };
    }
    const rsp = await ctx?.rpc?.webhook?.svc
      ?.createWebhook(CreateWebhookRequest.fromJSON(cont), setRpcContext(ctx))
      .toPromise();

    return rsp.webhook;
  }

  @Resource({
    name: 'webhook',
    identify: 'webhook',
    roles: ['owner', 'admin'],
    action: 'update',
  })
  @UseGuards(GqlAuthGuard)
  @ResolveField(() => Webhook)
  async update(
    @Args('input') input: UpdateWebhookInput,
    @Context() ctx: GqlContext,
  ): Promise<RpcWebhook> {
    const rsp = await ctx?.rpc?.webhook?.svc
      ?.updateWebhook(
        UpdateWebhookRequest.fromJSON({
          ...input.data,
          id: input.id,
        }),
        setRpcContext(ctx),
      )
      .toPromise();

    return rsp.webhook;
  }

  @Resource({
    name: 'webhook',
    identify: 'webhook',
    roles: ['owner', 'admin'],
    action: 'delete',
  })
  @UseGuards(GqlAuthGuard)
  @ResolveField(() => Webhook, { name: 'delete' })
  async remove(
    @Args('input') input: DeleteWebhookInput,
    @Context() ctx: GqlContext,
  ): Promise<RpcWebhook> {
    const rsp = await ctx?.rpc?.webhook?.svc
      ?.deleteWebhook(
        {
          id: input.id,
        },
        setRpcContext(ctx),
      )
      .toPromise();

    return rsp.webhook;
  }
}

import { UseGuards } from '@nestjs/common';
import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard, GqlContext, Resource, setRpcContext } from '@ssc/core';
import { Member as RpcMember } from '@ssc/proto-schema/tenant';

import {
  DeleteMemberInput,
  InviteMemberInput,
  Member,
  MemberMutations,
  UpdateMemberInput,
} from './types';

@Resolver(() => MemberMutations)
export class TenantMembersMutationResolver {
  @Resource({
    name: 'member',
    identify: 'member',
    roles: ['owner', 'admin'],
    action: 'delete',
  })
  @UseGuards(GqlAuthGuard)
  @ResolveField(() => Member)
  async invite(
    @Args('input') input: InviteMemberInput,
    @Context() ctx: GqlContext,
  ): Promise<RpcMember> {
    const result = await ctx?.rpc?.tenant.svc
      .inviteMember(
        {
          email: input.email,
          role: input.role,
          userId: input.userId,
        },
        setRpcContext(ctx),
      )
      .toPromise();

    return result.member;
  }

  @Resource({
    name: 'member',
    identify: 'member',
    roles: ['owner', 'admin'],
    action: 'delete',
  })
  @UseGuards(GqlAuthGuard)
  @ResolveField(() => Member)
  async update(
    @Args('input') input: UpdateMemberInput,
    @Context() ctx: GqlContext,
  ): Promise<RpcMember> {
    const result = await ctx?.rpc?.tenant.svc
      .updateMember(
        {
          role: input.role,
          id: input.id,
          status: null,
        },
        setRpcContext(ctx),
      )
      .toPromise();

    return result.member;
  }

  @Resource({
    name: 'member',
    identify: 'member',
    roles: ['owner', 'admin'],
    action: 'delete',
  })
  @UseGuards(GqlAuthGuard)
  @ResolveField(() => Member)
  async delete(
    @Args('input') input: DeleteMemberInput,
    @Context() ctx: GqlContext,
  ): Promise<RpcMember> {
    const result = await ctx?.rpc?.tenant.svc
      .deleteMember(
        {
          id: input.id,
        },
        setRpcContext(ctx),
      )
      .toPromise();

    return result.member;
  }
}

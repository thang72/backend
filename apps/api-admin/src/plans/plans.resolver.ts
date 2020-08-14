import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Price } from '@ssc/contracts';
import { GqlContext } from '@ssc/core';
import {
  Plan as PlanRpc,
  StripePlan as StripePlanRpc,
} from '@ssc/proto-schema/billing';

import { Plan } from './types';

@Resolver(() => Plan)
export class PlansResolver {
  @Query(() => Plan)
  async plan(
    @Args('id') id: string,
    @Context() ctx: GqlContext,
  ): Promise<PlanRpc> {
    const result = await ctx?.rpc?.billing?.svc.readPlan({ id }).toPromise();
    return result.plan;
  }

  @Query(() => [Plan])
  async plans(@Context() ctx: GqlContext): Promise<PlanRpc[]> {
    const result = await ctx?.rpc?.billing?.svc.findPlans({}).toPromise();
    return result.plans;
  }

  @ResolveField(() => [Price])
  async prices(
    @Context() ctx: GqlContext,
    @Parent() parent: Plan,
  ): Promise<StripePlanRpc[]> {
    const result = await ctx?.rpc?.billing?.svc
      .findStripePlans({ productId: parent.normalizedName })
      .toPromise();
    return result.plans;
  }
}

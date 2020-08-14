import { Module } from '@nestjs/common';
import { PlanRepository } from '@ssc/repository';

import { PlansService } from './plans.service';

@Module({
  providers: [PlansService, PlanRepository],
  exports: [PlansService],
})
export class PlansModule {}

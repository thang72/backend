import { ICommand } from '@nestjs/cqrs';
import { CreatePlanRequest } from '@ssc/proto-schema/billing';

export class CreatePlanCommand implements ICommand {
  constructor(public readonly input: CreatePlanRequest) {}
}

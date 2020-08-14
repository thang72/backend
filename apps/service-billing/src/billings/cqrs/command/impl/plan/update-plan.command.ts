import { ICommand } from '@nestjs/cqrs';
import { CreatePlanRequest } from '@ssc/proto-schema/billing';

export class UpdatePlanCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly input: CreatePlanRequest,
  ) {}
}

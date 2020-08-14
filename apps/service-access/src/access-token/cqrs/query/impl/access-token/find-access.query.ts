import { IQuery } from '@nestjs/cqrs';
import { FindAccessRequest } from '@ssc/proto-schema/access';

export class FindAccessQuery implements IQuery {
  constructor(public readonly input: FindAccessRequest) {}
}

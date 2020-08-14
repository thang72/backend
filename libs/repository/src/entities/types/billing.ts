import { Type } from 'class-transformer';

import { AggregateRoot } from '@nestjs/cqrs';
import { Address } from '@ssc/contracts';

export class CardEntity extends AggregateRoot {
  id: string;

  name: string;

  number: string;

  brand?: string;

  lastFourDigit?: string;

  currency?: string;

  @Type(() => Address)
  address?: Address;

  expMonth: number;

  expYear: number;
}

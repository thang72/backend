import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Injectable, Logger } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { TenantCreatedEvent } from '@ssc/core/cqrs';
import { TenantRepository } from '@ssc/repository';

@Injectable()
export class TenantSagas {
  constructor(private readonly tenantRepository: TenantRepository) {}

  @Saga()
  tenantCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TenantCreatedEvent),
      delay(500),
      map((event) => {
        Logger.log('Inside [TenantSagas] Saga', JSON.stringify(event.tenant));
        return null;
      }),
    );
  };
}

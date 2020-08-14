import { InjectStripe } from 'nestjs-stripe';
import * as Stripe from 'stripe';

import { CACHE_MANAGER, CacheStore, Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Invoice, ReadInvoiceResponse } from '@ssc/proto-schema/billing';

import { invoiceToProtoInvoice } from '../../../../../common';
import { GetInvoiceQuery } from '../../impl';

@QueryHandler(GetInvoiceQuery)
export class GetInvoiceHandler implements IQueryHandler<GetInvoiceQuery> {
  logger = new Logger(this.constructor.name);

  public constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @Inject(CACHE_MANAGER) private readonly cacheStore: CacheStore,
  ) {}

  async execute(query: GetInvoiceQuery): Promise<ReadInvoiceResponse> {
    this.logger.log(`Async ${query.constructor.name}...`);
    const { id } = query;

    if (!id) {
      throw new RpcException('Missing Invoice id input');
    }

    try {
      // Check cache to see if data exist
      const cacheData = await this.cacheStore.get<Invoice>(
        'service-billing/invoice/' + id,
      );
      if (cacheData !== undefined && typeof cacheData !== 'undefined') {
        return { invoice: cacheData };
      }

      const result = await this.stripeClient.invoices.retrieve(id);
      const invoice = invoiceToProtoInvoice(result);

      await this.cacheStore.set('service-billing/invoice/' + id, invoice, {
        ttl: 100,
      });
      return {
        invoice,
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}

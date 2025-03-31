import { BaseQuery } from './base.query';

export class GetInvoiceByIdQuery extends BaseQuery {
  constructor(
    public readonly filters: Record<string, any>,
    metadata?: Record<string, any>
  ) {
    super(metadata);
  }
}

import { BaseEvent } from './base.event';

export class InvoiceUpdatedEvent extends BaseEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly payload: any
  ) {
    super(aggregateId);
  }
}

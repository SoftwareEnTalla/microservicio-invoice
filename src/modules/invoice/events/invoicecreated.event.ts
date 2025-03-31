import { BaseEvent } from './base.event';

export class InvoiceCreatedEvent extends BaseEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly payload: any
  ) {
    super(aggregateId);
  }
}

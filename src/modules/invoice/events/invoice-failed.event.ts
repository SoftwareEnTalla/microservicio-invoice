import { BaseEvent,BaseFailedEvent } from './base.event';

export class SagaInvoiceFailedEvent extends BaseFailedEvent {
  constructor(
    public readonly error: Error,
    public readonly event: any
  ) {
    super(error, event);
  }
}

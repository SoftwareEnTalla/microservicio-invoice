import { BaseCommand } from './base.command';

export class DeleteInvoiceCommand extends BaseCommand {
  constructor(
    public readonly payload: any,
    metadata?: Record<string, any>
  ) {
    super(metadata);
  }
}

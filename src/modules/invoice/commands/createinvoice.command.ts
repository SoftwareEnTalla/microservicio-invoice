import { BaseCommand } from './base.command';

export class CreateInvoiceCommand extends BaseCommand {
  constructor(
    public readonly payload: any,
    metadata?: Record<string, any>
  ) {
    super(metadata);
  }
}

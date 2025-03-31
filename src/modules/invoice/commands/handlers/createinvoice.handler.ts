import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInvoiceCommand } from '../createinvoice.command';

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceHandler implements ICommandHandler<CreateInvoiceCommand> {
  async execute(command: CreateInvoiceCommand) {
    // Implementar lógica del comando
  }
}

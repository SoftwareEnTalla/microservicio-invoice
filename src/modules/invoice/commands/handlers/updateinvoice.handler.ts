import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInvoiceCommand } from '../updateinvoice.command';

@CommandHandler(UpdateInvoiceCommand)
export class UpdateInvoiceHandler implements ICommandHandler<UpdateInvoiceCommand> {
  async execute(command: UpdateInvoiceCommand) {
    // Implementar lógica del comando
  }
}

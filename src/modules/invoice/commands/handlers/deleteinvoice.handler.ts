import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteInvoiceCommand } from '../deleteinvoice.command';

@CommandHandler(DeleteInvoiceCommand)
export class DeleteInvoiceHandler implements ICommandHandler<DeleteInvoiceCommand> {
  async execute(command: DeleteInvoiceCommand) {
    // Implementar lógica del comando
  }
}

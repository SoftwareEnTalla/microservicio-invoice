import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllInvoiceQuery } from '../getallinvoice.query';

@QueryHandler(GetAllInvoiceQuery)
export class GetAllInvoiceHandler implements IQueryHandler<GetAllInvoiceQuery> {
  async execute(query: GetAllInvoiceQuery) {
    // Implementar lógica de la query
  }
}

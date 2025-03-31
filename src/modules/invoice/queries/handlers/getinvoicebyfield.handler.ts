import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetInvoiceByFieldQuery } from '../getinvoicebyfield.query';

@QueryHandler(GetInvoiceByFieldQuery)
export class GetInvoiceByFieldHandler implements IQueryHandler<GetInvoiceByFieldQuery> {
  async execute(query: GetInvoiceByFieldQuery) {
    // Implementar lógica de la query
  }
}

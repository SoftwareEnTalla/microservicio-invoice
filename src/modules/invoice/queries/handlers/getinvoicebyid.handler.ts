import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetInvoiceByIdQuery } from '../getinvoicebyid.query';

@QueryHandler(GetInvoiceByIdQuery)
export class GetInvoiceByIdHandler implements IQueryHandler<GetInvoiceByIdQuery> {
  async execute(query: GetInvoiceByIdQuery) {
    // Implementar lógica de la query
  }
}

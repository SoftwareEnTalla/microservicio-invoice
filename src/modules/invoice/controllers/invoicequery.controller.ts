import { Controller } from '@nestjs/common';
import { InvoiceQueryService } from '../services/invoicequery.service';
import { FindManyOptions } from "typeorm";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('InvoiceQueryController')
@Controller('InvoiceQueryController')
export class InvoiceQueryController {
  constructor(private readonly service: InvoiceQueryService) {}
  
  // Implementar endpoints aquí
}

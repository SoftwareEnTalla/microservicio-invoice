import { Controller } from '@nestjs/common';
import { InvoiceCommandService } from '../services/invoicecommand.service';
import { FindManyOptions } from "typeorm";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('InvoiceCommandController')
@Controller('InvoiceCommandController')
export class InvoiceCommandController {
  constructor(private readonly service: InvoiceCommandService) {}
  
  // Implementar endpoints aquí
}

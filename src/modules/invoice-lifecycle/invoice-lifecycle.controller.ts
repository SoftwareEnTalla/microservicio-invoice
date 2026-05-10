import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { InvoiceLifecycleService } from './invoice-lifecycle.service';

@ApiTags('invoice-lifecycle')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Autenticación requerida.' })
@Controller('invoice-lifecycle')
export class InvoiceLifecycleController {
  constructor(private readonly service: InvoiceLifecycleService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Resumen agregado del lifecycle documental de invoices' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Resumen documental de invoices.' })
  async getSummary(@Query('limit') limit?: string): Promise<Record<string, unknown>> {
    return this.service.getSummary(Number(limit || 8));
  }
}
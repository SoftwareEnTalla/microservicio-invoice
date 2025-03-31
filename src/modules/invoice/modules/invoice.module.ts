import { Module } from '@nestjs/common';
import { InvoiceCommandController } from '../controllers/invoicecommand.controller';
import { InvoiceCommandService } from '../services/invoicecommand.service';
import { InvoiceCommandRepository } from '../repositories/invoicecommand.repository';
import { InvoiceResolver } from '../graphql/invoice.resolver';
import { InvoiceAuthGuard } from '../guards/invoiceauthguard.guard';

//Interceptors
import { InvoiceInterceptor } from '../interceptors/invoice.interceptor';
import { InvoiceLoggingInterceptor } from '../interceptors/invoice.logging.interceptor';

@Module({
  controllers: [InvoiceCommandController],
  providers: [
    InvoiceCommandService,
    InvoiceCommandRepository,
    InvoiceResolver,
    InvoiceAuthGuard,
    InvoiceInterceptor,
    InvoiceLoggingInterceptor
  ],
})
export class InvoiceModule {}

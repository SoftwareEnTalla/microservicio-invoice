import { Module } from "@nestjs/common";
import { InvoiceCommandController } from "../controllers/invoicecommand.controller";
import { InvoiceLoggingInterceptor } from "../interceptors/invoice.logging.interceptor";
import { CommandBus, EventBus, UnhandledExceptionBus } from "@nestjs/cqrs";
import { InvoiceAuthGuard } from "../guards/invoiceauthguard.guard";

@Module({
  controllers: [InvoiceCommandController],
  providers: [
    InvoiceAuthGuard,
    InvoiceLoggingInterceptor,
    CommandBus,
    EventBus,
    UnhandledExceptionBus,
  ],
  exports: [InvoiceAuthGuard, CommandBus, EventBus, UnhandledExceptionBus],
})
export class AuthInvoiceModule {}

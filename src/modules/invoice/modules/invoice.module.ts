import { Module } from "@nestjs/common";
import { InvoiceCommandController } from "../controllers/invoicecommand.controller";
import { InvoiceQueryController } from "../controllers/invoicequery.controller";
import { InvoiceCommandService } from "../services/invoicecommand.service";
import { InvoiceQueryService } from "../services/invoicequery.service";
import { InvoiceCommandRepository } from "../repositories/invoicecommand.repository";
import { InvoiceQueryRepository } from "../repositories/invoicequery.repository";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { InvoiceResolver } from "../graphql/invoice.resolver";
import { InvoiceAuthGuard } from "../guards/invoiceauthguard.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "../entities/invoice.entity";
import { CommandBus, EventBus, UnhandledExceptionBus } from "@nestjs/cqrs";
import { CacheModule } from "@nestjs/cache-manager";

//Interceptors
import { InvoiceInterceptor } from "../interceptors/invoice.interceptor";
import { InvoiceLoggingInterceptor } from "../interceptors/invoice.logging.interceptor";


@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]), // Asegúrate de incluir esto
    CacheModule.register(), // Importa el módulo de caché
  ],
  controllers: [InvoiceCommandController, InvoiceQueryController],
  providers: [
    InvoiceQueryService,
    InvoiceCommandService,
    InvoiceCommandRepository,
    InvoiceQueryRepository,
    InvoiceRepository,
    InvoiceResolver,
    InvoiceAuthGuard,
    InvoiceInterceptor,
    InvoiceLoggingInterceptor,
    UnhandledExceptionBus, // Manejador global de excepciones
    CommandBus, // Bus de comandos
    EventBus, // Bus de eventos
  ],
  exports: [
    InvoiceQueryService,
    InvoiceCommandService,
    InvoiceCommandRepository,
    InvoiceQueryRepository,
    InvoiceRepository,
    InvoiceResolver,
    InvoiceAuthGuard,
    InvoiceInterceptor,
    InvoiceLoggingInterceptor,
    UnhandledExceptionBus, // Manejador global de excepciones
    CommandBus, // Bus de comandos
    EventBus, // Bus de eventos
  ],
})
export class InvoiceModule {}


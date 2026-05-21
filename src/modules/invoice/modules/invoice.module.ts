/*
 * Copyright (c) 2025 SoftwarEnTalla
 * Licencia: MIT
 * Contacto: softwarentalla@gmail.com
 * CEOs: 
 *       Persy Morell Guerra      Email: pmorellpersi@gmail.com  Phone : +53-5336-4654 Linkedin: https://www.linkedin.com/in/persy-morell-guerra-288943357/
 *       Dailyn García Domínguez  Email: dailyngd@gmail.com      Phone : +53-5432-0312 Linkedin: https://www.linkedin.com/in/dailyn-dominguez-3150799b/
 *
 * CTO: Persy Morell Guerra
 * COO: Dailyn García Domínguez and Persy Morell Guerra
 * CFO: Dailyn García Domínguez and Persy Morell Guerra
 *
 * Repositories: 
 *               https://github.com/SoftwareEnTalla 
 *
 *               https://github.com/apokaliptolesamale?tab=repositories
 *
 *
 * Social Networks:
 *
 *              https://x.com/SoftwarEnTalla
 *
 *              https://www.facebook.com/profile.php?id=61572625716568
 *
 *              https://www.instagram.com/softwarentalla/
 *              
 *
 *
 */


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
import { CqrsModule } from "@nestjs/cqrs";
import { CacheModule } from "@nestjs/cache-manager";

//Interceptors
import { InvoiceInterceptor } from "../interceptors/invoice.interceptor";
import { InvoiceLoggingInterceptor } from "../interceptors/invoice.logging.interceptor";

//Event-Sourcing dependencies
import { EventStoreService } from "../shared/event-store/event-store.service";
import { KafkaEventPublisher } from "../shared/adapters/kafka-event-publisher";
import { KafkaModule } from "./kafka.module";
import { FinancialActionGuard } from '../../../common/financial-security/financial-action.guard';
import { SecurityAuditBridgeService } from '../../../common/financial-security/security-audit-bridge.service';
import { SecurityIdentityBridgeService } from '../../../common/financial-security/security-identity-bridge.service';
import { InvoiceCrudSaga } from "../sagas/invoice-crud.saga";

@Module({
  imports: [
    CqrsModule,
    KafkaModule,
    TypeOrmModule.forFeature([Invoice]), // Asegúrate de incluir esto
    CacheModule.register(), // Importa el módulo de caché
  ],
  controllers: [InvoiceCommandController, InvoiceQueryController],
  providers: [
    //Services
    EventStoreService,
    InvoiceQueryService,
    InvoiceCommandService,
    //Repositories
    InvoiceCommandRepository,
    InvoiceQueryRepository,
    InvoiceRepository,      
    //Resolvers
    InvoiceResolver,
    //Guards
    InvoiceAuthGuard,
    FinancialActionGuard,
    //Interceptors
    InvoiceInterceptor,
    InvoiceLoggingInterceptor,
    InvoiceCrudSaga,
    SecurityAuditBridgeService,
    SecurityIdentityBridgeService,
  ],
  exports: [
    CqrsModule,
    KafkaModule,
    //Services
    EventStoreService,
    InvoiceQueryService,
    InvoiceCommandService,
    //Repositories
    InvoiceCommandRepository,
    InvoiceQueryRepository,
    InvoiceRepository,      
    //Resolvers
    InvoiceResolver,
    //Guards
    InvoiceAuthGuard,
    FinancialActionGuard,
    //Interceptors
    InvoiceInterceptor,
    InvoiceLoggingInterceptor,
    InvoiceCrudSaga,
    SecurityAuditBridgeService,
    SecurityIdentityBridgeService,
  ],
})
export class InvoiceModule {}


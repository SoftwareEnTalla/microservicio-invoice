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


import { Injectable, Logger, NotFoundException, OnModuleInit } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { Invoice } from "../entities/invoice.entity";
import { CreateInvoiceDto, UpdateInvoiceDto, DeleteInvoiceDto } from "../dtos/all-dto";
 
import { generateCacheKey } from "src/utils/functions";
import { InvoiceCommandRepository } from "../repositories/invoicecommand.repository";
import { InvoiceQueryRepository } from "../repositories/invoicequery.repository";
import { Cacheable } from "../decorators/cache.decorator";
import { InvoiceResponse, InvoicesResponse } from "../types/invoice.types";
import { Helper } from "src/common/helpers/helpers";
//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { CommandBus } from "@nestjs/cqrs";
import { EventStoreService } from "../shared/event-store/event-store.service";
import { KafkaEventPublisher } from "../shared/adapters/kafka-event-publisher";
import { ModuleRef } from "@nestjs/core";
import { InvoiceQueryService } from "./invoicequery.service";

@Injectable()
export class InvoiceCommandService implements OnModuleInit {
  // Private properties
  readonly #logger = new Logger(InvoiceCommandService.name);
  //Constructo del servicio InvoiceCommandService
  constructor(
    private readonly repository: InvoiceCommandRepository,
    private readonly queryRepository: InvoiceQueryRepository,
    private readonly commandBus: CommandBus,
    private readonly eventStore: EventStoreService,
    private readonly eventPublisher: KafkaEventPublisher,
    private moduleRef: ModuleRef
  ) {
    //Inicialice aquí propiedades o atributos
  }


  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  onModuleInit() {
    //Se ejecuta en la inicialización del módulo
  }

  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceCommandService.name)
      .get(InvoiceCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<CreateInvoiceDto>("createInvoice", args[0], args[1]),
    ttl: 60,
  })
  async create(
    createInvoiceDtoInput: CreateInvoiceDto
  ): Promise<InvoiceResponse<Invoice>> {
    try {
      logger.info("Receiving in service:", createInvoiceDtoInput);
      const entity = await this.repository.create(
        Invoice.fromDto(createInvoiceDtoInput)
      );
      logger.info("Entity created on service:", entity);
      // Respuesta si el invoice no existe
      if (!entity)
        throw new NotFoundException("Entidad Invoice no encontrada.");
      // Devolver invoice
      return {
        ok: true,
        message: "Invoice obtenido con éxito.",
        data: entity,
      };
    } catch (error) {
      logger.info("Error creating entity on service:", error);
      // Imprimir error
      logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }


  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceCommandService.name)
      .get(InvoiceCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<Invoice>("createInvoices", args[0], args[1]),
    ttl: 60,
  })
  async bulkCreate(
    createInvoiceDtosInput: CreateInvoiceDto[]
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const entities = await this.repository.bulkCreate(
        createInvoiceDtosInput.map((entity) => Invoice.fromDto(entity))
      );

      // Respuesta si el invoice no existe
      if (!entities)
        throw new NotFoundException("Entidades Invoices no encontradas.");
      // Devolver invoice
      return {
        ok: true,
        message: "Invoices creados con éxito.",
        data: entities,
        count: entities.length,
      };
    } catch (error) {
      // Imprimir error
      logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }


  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceCommandService.name)
      .get(InvoiceCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<UpdateInvoiceDto>("updateInvoice", args[0], args[1]),
    ttl: 60,
  })
  async update(
    id: string,
    partialEntity: UpdateInvoiceDto
  ): Promise<InvoiceResponse<Invoice>> {
    try {
      const entity = await this.repository.update(
        id,
        Invoice.fromDto(partialEntity)
      );
      // Respuesta si el invoice no existe
      if (!entity)
        throw new NotFoundException("Entidades Invoices no encontradas.");
      // Devolver invoice
      return {
        ok: true,
        message: "Invoice actualizada con éxito.",
        data: entity,
      };
    } catch (error) {
      // Imprimir error
      logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }


  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceCommandService.name)
      .get(InvoiceCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<UpdateInvoiceDto>("updateInvoices", args[0]),
    ttl: 60,
  })
  async bulkUpdate(
    partialEntity: UpdateInvoiceDto[]
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const entities = await this.repository.bulkUpdate(
        partialEntity.map((entity) => Invoice.fromDto(entity))
      );
      // Respuesta si el invoice no existe
      if (!entities)
        throw new NotFoundException("Entidades Invoices no encontradas.");
      // Devolver invoice
      return {
        ok: true,
        message: "Invoices actualizadas con éxito.",
        data: entities,
        count: entities.length,
      };
    } catch (error) {
      // Imprimir error
      logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }

   @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceCommandService.name)
      .get(InvoiceCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<DeleteInvoiceDto>("deleteInvoice", args[0], args[1]),
    ttl: 60,
  })
  async delete(id: string): Promise<InvoiceResponse<Invoice>> {
    try {
      const entity = await this.queryRepository.findById(id);
      // Respuesta si el invoice no existe
      if (!entity)
        throw new NotFoundException("Instancias de Invoice no encontradas.");

      const result = await this.repository.delete(id);
      // Devolver invoice
      return {
        ok: true,
        message: "Instancia de Invoice eliminada con éxito.",
        data: entity,
      };
    } catch (error) {
      // Imprimir error
      logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceCommandService.name)
      .get(InvoiceCommandService.name),
  })
  @Cacheable({
    key: (args) => generateCacheKey<string[]>("deleteInvoices", args[0]),
    ttl: 60,
  })
  async bulkDelete(ids: string[]): Promise<DeleteResult> {
    return await this.repository.bulkDelete(ids);
  }
}


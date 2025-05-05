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


import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

//Definición de entidades
import { Invoice } from "../entities/invoice.entity";

//Definición de comandos
import {
  CreateInvoiceCommand,
  UpdateInvoiceCommand,
  DeleteInvoiceCommand,
} from "../commands/exporting.command";

import { CommandBus } from "@nestjs/cqrs";
import { InvoiceQueryService } from "../services/invoicequery.service";


import { InvoiceResponse, InvoicesResponse } from "../types/invoice.types";
import { FindManyOptions } from "typeorm";
import { PaginationArgs } from "src/common/dto/args/pagination.args";
import { fromObject } from "src/utils/functions";

//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { v4 as uuidv4 } from "uuid";

//Definición de tdos
import { UpdateInvoiceDto, 
CreateOrUpdateInvoiceDto, 
InvoiceValueInput, 
InvoiceDto, 
CreateInvoiceDto } from "../dtos/all-dto";
 

//@UseGuards(JwtGraphQlAuthGuard)
@Resolver(() => Invoice)
export class InvoiceResolver {

   //Constructor del resolver de Invoice
  constructor(
    private readonly service: InvoiceQueryService,
    private readonly commandBus: CommandBus
  ) {}

  @LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  // Mutaciones
  @Mutation(() => InvoiceResponse<Invoice>)
  async createInvoice(
    @Args("input", { type: () => CreateInvoiceDto }) input: CreateInvoiceDto
  ): Promise<InvoiceResponse<Invoice>> {
    return this.commandBus.execute(new CreateInvoiceCommand(input));
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Mutation(() => InvoiceResponse<Invoice>)
  async updateInvoice(
    @Args("id", { type: () => String }) id: string,
    @Args("input") input: UpdateInvoiceDto
  ): Promise<InvoiceResponse<Invoice>> {
    const payLoad = input;
    return this.commandBus.execute(
      new UpdateInvoiceCommand(payLoad, {
        instance: payLoad,
        metadata: {
          initiatedBy: payLoad.createdBy || 'system',
          correlationId: payLoad.id,
        },
      })
    );
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Mutation(() => InvoiceResponse<Invoice>)
  async createOrUpdateInvoice(
    @Args("data", { type: () => CreateOrUpdateInvoiceDto })
    data: CreateOrUpdateInvoiceDto
  ): Promise<InvoiceResponse<Invoice>> {
    if (data.id) {
      const existingInvoice = await this.service.findById(data.id);
      if (existingInvoice) {
        return this.commandBus.execute(
          new UpdateInvoiceCommand(data, {
            instance: data,
            metadata: {
              initiatedBy:
                (data.input as CreateInvoiceDto | UpdateInvoiceDto).createdBy ||
                'system',
              correlationId: data.id,
            },
          })
        );
      }
    }
    return this.commandBus.execute(
      new CreateInvoiceCommand(data, {
        instance: data,
        metadata: {
          initiatedBy:
            (data.input as CreateInvoiceDto | UpdateInvoiceDto).createdBy ||
            'system',
          correlationId: data.id || uuidv4(),
        },
      })
    );
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Mutation(() => Boolean)
  async deleteInvoice(
    @Args("id", { type: () => String }) id: string
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteInvoiceCommand(id));
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  // Queries
  @Query(() => InvoicesResponse<Invoice>)
  async invoices(
    options?: FindManyOptions<Invoice>,
    paginationArgs?: PaginationArgs
  ): Promise<InvoicesResponse<Invoice>> {
    return this.service.findAll(options, paginationArgs);
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Query(() => InvoicesResponse<Invoice>)
  async invoice(
    @Args("id", { type: () => String }) id: string
  ): Promise<InvoiceResponse<Invoice>> {
    return this.service.findById(id);
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Query(() => InvoicesResponse<Invoice>)
  async invoicesByField(
    @Args("field", { type: () => String }) field: string,
    @Args("value", { type: () => InvoiceValueInput }) value: InvoiceValueInput,
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<InvoicesResponse<Invoice>> {
    return this.service.findByField(
      field,
      value,
      fromObject.call(PaginationArgs, { page: page, limit: limit })
    );
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Query(() => InvoicesResponse<Invoice>)
  async invoicesWithPagination(
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<InvoicesResponse<Invoice>> {
    const paginationArgs = fromObject.call(PaginationArgs, {
      page: page,
      limit: limit,
    });
    return this.service.findWithPagination({}, paginationArgs);
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Query(() => Number)
  async totalInvoices(): Promise<number> {
    return this.service.count();
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Query(() => InvoicesResponse<Invoice>)
  async searchInvoices(
    @Args("where", { type: () => InvoiceDto, nullable: false })
    where: Record<string, any>
  ): Promise<InvoicesResponse<Invoice>> {
    const invoices = await this.service.findAndCount(where);
    return invoices;
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Query(() => InvoiceResponse<Invoice>, { nullable: true })
  async findOneInvoice(
    @Args("where", { type: () => InvoiceDto, nullable: false })
    where: Record<string, any>
  ): Promise<InvoiceResponse<Invoice>> {
    return this.service.findOne(where);
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Query(() => InvoiceResponse<Invoice>)
  async findOneInvoiceOrFail(
    @Args("where", { type: () => InvoiceDto, nullable: false })
    where: Record<string, any>
  ): Promise<InvoiceResponse<Invoice> | Error> {
    return this.service.findOneOrFail(where);
  }
}


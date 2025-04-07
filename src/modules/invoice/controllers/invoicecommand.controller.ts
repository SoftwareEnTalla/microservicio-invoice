<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  Get,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { InvoiceCommandService } from "../services/invoicecommand.service";

import { DeleteResult } from "typeorm";
import { Logger } from "@nestjs/common";
import { Helper } from "src/common/helpers/helpers";
import { Invoice } from "../entities/invoice.entity";
import { InvoiceResponse, InvoicesResponse } from "../types/invoice.types";
import { CreateInvoiceDto } from "../dtos/createinvoice.dto";
import { UpdateInvoiceDto } from "../dtos/updateinvoice.dto";
import { LoggerClient } from "src/common/logger/logger.client";
import { LogExecutionTime } from "src/common/logger/loggers.functions";

@ApiTags("Invoice Command")
@Controller("invoices/command")
export class InvoiceCommandController {

  #logger = new Logger(InvoiceCommandController.name);

  //Constructor del controlador: InvoiceCommandController
  constructor(private readonly service: InvoiceCommandService) {}

  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceCommandController.name)
      .get(InvoiceCommandController.name),
  })
  @Post()
  @ApiOperation({ summary: "Create a new invoice" })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({ status: 201, type: InvoiceResponse<Invoice> })
  async create(
    @Body() createInvoiceDtoInput: CreateInvoiceDto
  ): Promise<InvoiceResponse<Invoice>> {
    try {
      const entity = await this.service.create(createInvoiceDtoInput);

      if (!entity) {
        throw new NotFoundException("Invoice entity not found.");
      }

      return entity;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceCommandController.name)
      .get(InvoiceCommandController.name),
  })
  @Post("bulk")
  @ApiOperation({ summary: "Create multiple invoices" })
  @ApiBody({ type: [CreateInvoiceDto] })
  @ApiResponse({ status: 201, type: InvoicesResponse<Invoice> })
  async bulkCreate(
    @Body() createInvoiceDtosInput: CreateInvoiceDto[]
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const entities = await this.service.bulkCreate(createInvoiceDtosInput);

      if (!entities) {
        throw new NotFoundException("Invoice entities not found.");
      }

      return entities;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceCommandController.name)
      .get(InvoiceCommandController.name),
  })
  @Put(":id")
  @ApiOperation({ summary: "Update an invoice" })
  @ApiBody({ type: UpdateInvoiceDto })
  @ApiResponse({ status: 200, type: InvoiceResponse<Invoice> })
  async update(
    @Param("id") id: string,
    @Body() partialEntity: UpdateInvoiceDto
  ): Promise<InvoiceResponse<Invoice>> {
    try {
      const entity = await this.service.update(
        id,
        partialEntity
      );

      if (!entity) {
        throw new NotFoundException("Invoice entity not found.");
      }

      return entity;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceCommandController.name)
      .get(InvoiceCommandController.name),
  })
  @Put("bulk")
  @ApiOperation({ summary: "Update multiple invoices" })
  @ApiBody({ type: [UpdateInvoiceDto] })
  @ApiResponse({ status: 200, type: InvoicesResponse<Invoice> })
  async bulkUpdate(
    @Body() partialEntities: UpdateInvoiceDto[]
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const entities = await this.service.bulkUpdate(partialEntities);

      if (!entities) {
        throw new NotFoundException("Invoice entities not found.");
      }

      return entities;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceCommandController.name)
      .get(InvoiceCommandController.name),
  })
  @Delete(":id")
  @ApiOperation({ summary: "Delete an invoice" })
  @ApiResponse({ status: 200, type: InvoiceResponse<Invoice> })
  async delete(@Param("id") id: string): Promise<InvoiceResponse<Invoice>> {
    try {
      const result = await this.service.delete(id);

      if (!result) {
        throw new NotFoundException("Invoice entity not found.");
      }

      return result;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceCommandController.name)
      .get(InvoiceCommandController.name),
  })
  @Delete("bulk")
  @ApiOperation({ summary: "Delete multiple invoices" })
  @ApiResponse({ status: 200, type: DeleteResult })
  async bulkDelete(@Query("ids") ids: string[]): Promise<DeleteResult> {
    return await this.service.bulkDelete(ids);
  }
}

<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)

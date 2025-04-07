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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";
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

import { BadRequestException } from "@nestjs/common";

@ApiTags("Invoice Command")
@Controller("invoices/command")
export class InvoiceCommandController {

  #logger = new Logger(InvoiceCommandController.name);

  //Constructor del controlador: InvoiceCommandController
  constructor(private readonly service: InvoiceCommandService) {}

  
  
  @ApiOperation({ summary: "Create a new invoice" })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({ status: 201, type: InvoiceResponse<Invoice> })
  @Post()
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

  
  
  @ApiOperation({ summary: "Create multiple invoices" })
  @ApiBody({ type: [CreateInvoiceDto] })
  @ApiResponse({ status: 201, type: InvoicesResponse<Invoice> })
  @Post("bulk")
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

  
  
  @ApiOperation({ summary: "Update an invoice" })
  @ApiParam({
    name: "id",
    description: "Identificador desde la url del endpoint",
  }) // ✅ Documentamos el ID de la URL
  @ApiBody({
    type: UpdateInvoiceDto,
    description: "El Payload debe incluir el mismo ID de la URL",
  })
  @ApiResponse({ status: 200, type: InvoiceResponse<Invoice> })
  @ApiResponse({
    status: 400,
    description:
      "EL ID en la URL no coincide con la instancia Invoice a actualizar.",
  }) // ✅ Nuevo status para el error de validación
  @Put(":id")
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
  async update(
    @Param("id") id: string,
    @Body() partialEntity: UpdateInvoiceDto
  ): Promise<InvoiceResponse<Invoice>> {
    try {
      // ✅ Validación de coincidencia de IDs
      if (id !== partialEntity.id) {
        throw new BadRequestException(
          "El ID en la URL no coincide con el ID en la instancia de Invoice a actualizar."
        );
      }
      const entity = await this.service.update(id, partialEntity);

      if (!entity) {
        throw new NotFoundException("Instancia de Invoice no encontrada.");
      }

      return entity;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  
  
  @ApiOperation({ summary: "Update multiple invoices" })
  @ApiBody({ type: [UpdateInvoiceDto] })
  @ApiResponse({ status: 200, type: InvoicesResponse<Invoice> })
  @Put("bulk")
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

  
  
  @ApiOperation({ summary: "Delete an invoice" })   
  @ApiResponse({ status: 200, type: InvoiceResponse<Invoice>,description:
    "Instancia de Invoice eliminada satisfactoriamente.", })
  @ApiResponse({
    status: 400,
    description:
      "EL ID en la URL no coincide con la instancia Invoice a eliminar.",
  }) // ✅ Nuevo status para el error de validación
  @Delete(":id")
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

  
  
  @ApiOperation({ summary: "Delete multiple invoices" })
  @ApiResponse({ status: 200, type: DeleteResult })
  @Delete("bulk")
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
  async bulkDelete(@Query("ids") ids: string[]): Promise<DeleteResult> {
    return await this.service.bulkDelete(ids);
  }
}


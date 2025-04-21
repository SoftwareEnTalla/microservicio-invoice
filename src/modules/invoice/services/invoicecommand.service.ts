import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { Invoice } from "../entities/invoice.entity";
import { CreateInvoiceDto } from "../dtos/createinvoice.dto";
import { UpdateInvoiceDto } from "../dtos/updateinvoice.dto";
import { DeleteInvoiceDto } from "../dtos/deleteinvoice.dto";
import { generateCacheKey } from "src/utils/functions";
import { InvoiceCommandRepository } from "../repositories/invoicecommand.repository";
import { InvoiceQueryRepository } from "../repositories/invoicequery.repository";
import { Cacheable } from "../decorators/cache.decorator";
import { InvoiceResponse, InvoicesResponse } from "../types/invoice.types";
import { Helper } from "src/common/helpers/helpers";
//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";

@Injectable()
export class InvoiceCommandService {
  // Private properties
  readonly #logger = new Logger(InvoiceCommandService.name);
  //Constructo del servicio InvoiceCommandService
  constructor(
    private readonly repository: InvoiceCommandRepository,
    private readonly queryRepository: InvoiceQueryRepository
  ) {
    //Inicialice aquí propiedades o atributos
  }

  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try {
        return await client.send(logData);
      } catch (error) {
        console.info(
          "Ha ocurrido un error al enviar la traza de log: ",
          logData
        );
        console.info("ERROR-LOG: ", error);
        throw error;
      }
    },
    client: new LoggerClient()
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
      const entity = await this.repository.create(
        Invoice.fromDto(createInvoiceDtoInput)
      );

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
      // Imprimir error
      this.#logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try {
        return await client.send(logData);
      } catch (error) {
        console.info(
          "Ha ocurrido un error al enviar la traza de log: ",
          logData
        );
        console.info("ERROR-LOG: ", error);
        throw error;
      }
    },
    client: new LoggerClient()
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
      this.#logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try {
        return await client.send(logData);
      } catch (error) {
        console.info(
          "Ha ocurrido un error al enviar la traza de log: ",
          logData
        );
        console.info("ERROR-LOG: ", error);
        throw error;
      }
    },
    client: new LoggerClient()
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
      this.#logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try {
        return await client.send(logData);
      } catch (error) {
        console.info(
          "Ha ocurrido un error al enviar la traza de log: ",
          logData
        );
        console.info("ERROR-LOG: ", error);
        throw error;
      }
    },
    client: new LoggerClient()
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
      this.#logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try {
        return await client.send(logData);
      } catch (error) {
        console.info(
          "Ha ocurrido un error al enviar la traza de log: ",
          logData
        );
        console.info("ERROR-LOG: ", error);
        throw error;
      }
    },
    client: new LoggerClient()
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
      this.#logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try {
        return await client.send(logData);
      } catch (error) {
        console.info(
          "Ha ocurrido un error al enviar la traza de log: ",
          logData
        );
        console.info("ERROR-LOG: ", error);
        throw error;
      }
    },
    client: new LoggerClient()
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

import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FindManyOptions } from "typeorm";
import { Invoice } from "../entities/invoice.entity";
import { BaseEntity } from "../entities/base.entity";
import { InvoiceQueryRepository } from "../repositories/invoicequery.repository";
import { InvoiceResponse, InvoicesResponse } from "../types/invoice.types";
import { Helper } from "src/common/helpers/helpers";
import { PaginationArgs } from "src/common/dto/args/pagination.args";
//import { Cacheable } from "../decorators/cache.decorator";

//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";

@Injectable()
export class InvoiceQueryService {
  // Private properties
  readonly #logger = new Logger(InvoiceQueryService.name);
  private readonly loggerClient = new LoggerClient();

  constructor(private readonly repository: InvoiceQueryRepository) {
    this.validate();
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
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  private validate(): void {
    try {
      const entityInstance = Object.create(Invoice.prototype);
      if (!(entityInstance instanceof BaseEntity)) {
        let sms = `El tipo ${Invoice.name} no extiende de BaseEntity. Asegúrate de que todas las entidades hereden correctamente.`;
        this.#logger.verbose(sms);
        throw new Error(sms);
      }
    } catch (error) {
      // Imprimir error
      this.#logger.error(error);
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
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findAll(
    options?: FindManyOptions<Invoice>,
    paginationArgs?: PaginationArgs
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const invoices = await this.repository.findAll(options);
      // Devolver respuesta
      this.#logger.verbose("sms");
      return {
        ok: true,
        message: "Listado de invoices obtenido con éxito",
        data: invoices,
        pagination: Helper.getPaginator(
          paginationArgs ? paginationArgs.page : 1,
          paginationArgs ? paginationArgs.size : 25,
          invoices.length
        ),
        count: invoices.length,
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
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findById(id: string): Promise<InvoiceResponse<Invoice>> {
    try {
      const invoice = await this.repository.findOne({
        where: { id },
        relations: [],
      });
      // Respuesta si el invoice no existe
      if (!invoice)
        throw new NotFoundException(
          "Invoice no encontrado para el id solicitado"
        );
      // Devolver invoice
      return {
        ok: true,
        message: "Invoice obtenido con éxito",
        data: invoice,
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
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findByField(
    field: string,
    value: any,
    paginationArgs?: PaginationArgs
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const [entities, lenght] = await this.repository.findAndCount({
        where: { [field]: value },
        skip:
          ((paginationArgs ? paginationArgs.page : 1) - 1) *
          (paginationArgs ? paginationArgs.size : 25),
        take: paginationArgs ? paginationArgs.size : 25,
      });

      // Respuesta si el invoice no existe
      if (!entities)
        throw new NotFoundException(
          "Invoices no encontrados para la propiedad y valor especificado"
        );
      // Devolver invoice
      return {
        ok: true,
        message: "Invoices obtenidos con éxito.",
        data: entities,
        pagination: Helper.getPaginator(
          paginationArgs ? paginationArgs.page : 1,
          paginationArgs ? paginationArgs.size : 25,
          lenght
        ),
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
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findWithPagination(
    options: FindManyOptions<Invoice>,
    paginationArgs?: PaginationArgs
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const entities = await this.repository.findWithPagination(
        options,
        paginationArgs ? paginationArgs.page : 1,
        paginationArgs ? paginationArgs.size : 25
      );

      // Respuesta si el invoice no existe
      if (!entities)
        throw new NotFoundException("Entidades Invoices no encontradas.");
      // Devolver invoice
      return {
        ok: true,
        message: "Invoice obtenido con éxito.",
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
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async count(): Promise<number> {
    return this.repository.count();
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
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findAndCount(
    where?: Record<string, any>,
    paginationArgs?: PaginationArgs
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const [entities, lenght] = await this.repository.findAndCount({
        where: where,
      });

      // Respuesta si el invoice no existe
      if (!entities)
        throw new NotFoundException(
          "Entidades Invoices no encontradas para el criterio especificado."
        );
      // Devolver invoice
      return {
        ok: true,
        message: "Invoices obtenidos con éxito.",
        data: entities,
        pagination: Helper.getPaginator(
          paginationArgs ? paginationArgs.page : 1,
          paginationArgs ? paginationArgs.size : 25,
          lenght
        ),
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
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findOne(
    where?: Record<string, any>
  ): Promise<InvoiceResponse<Invoice>> {
    try {
      const entity = await this.repository.findOne({
        where: where,
      });

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
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findOneOrFail(
    where?: Record<string, any>
  ): Promise<InvoiceResponse<Invoice> | Error> {
    try {
      const entity = await this.repository.findOne({
        where: where,
      });

      // Respuesta si el invoice no existe
      if (!entity)
        return new NotFoundException("Entidad Invoice no encontrada.");
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
}

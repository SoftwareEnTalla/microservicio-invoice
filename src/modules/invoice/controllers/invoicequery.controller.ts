import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { InvoiceQueryService } from "../services/invoicequery.service";
import { FindManyOptions } from "typeorm";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger";
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { InvoiceResponse, InvoicesResponse } from "../types/invoice.types";
import { LoggerClient } from "src/common/logger/logger.client";
import { Invoice } from "../entities/invoice.entity";
import { Order, PaginationArgs } from "src/common/dto/args/pagination.args";
import { Helper } from "src/common/helpers/helpers";
import { InvoiceDto } from "../dtos/createinvoice.dto";

@ApiTags("Invoice Query")
@Controller("invoices/query")
export class InvoiceQueryController {
  #logger = new Logger(InvoiceQueryController.name);

  constructor(private readonly service: InvoiceQueryService) {}

  @Get("list")
  @ApiOperation({ summary: "Get all invoice with optional pagination" })
  @ApiResponse({ status: 200, type: InvoicesResponse })
  @ApiQuery({ name: "options", required: false, type: InvoiceDto }) // Ajustar según el tipo real
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "size", required: false, type: Number })
  @ApiQuery({ name: "sort", required: false, type: String })
  @ApiQuery({ name: "order", required: false, type: () => Order })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "initDate", required: false, type: Date })
  @ApiQuery({ name: "endDate", required: false, type: Date })
  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findAll(
    @Query("options") options?: FindManyOptions<Invoice>
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const invoices = await this.service.findAll(options);
      this.#logger.verbose("Retrieving all invoice");
      return invoices;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get invoice by ID" })
  @ApiResponse({ status: 200, type: InvoiceResponse<Invoice> })
  @ApiResponse({ status: 404, description: "Invoice not found" })
  @ApiParam({
    name: "id",
    required: true,
    description: "ID of the invoice to retrieve",
    type: String,
  })
  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findById(@Param("id") id: string): Promise<InvoiceResponse<Invoice>> {
    try {
      const invoice = await this.service.findOne({ where: { id } });
      if (!invoice) {
        throw new NotFoundException(
          "Invoice no encontrado para el id solicitado"
        );
      }
      return invoice;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @Get("field/:field") // Asegúrate de que el endpoint esté definido correctamente
  @ApiOperation({ summary: "Find invoice by specific field" })
  @ApiQuery({
    name: "value",
    required: true,
    description: "Value to search for",
    type: String,
  }) // Documenta el parámetro de consulta
  @ApiParam({
    name: "field",
    required: true,
    description: "Field to filter invoice",
    type: String,
  }) // Documenta el parámetro de la ruta
  @ApiResponse({ status: 200, type: InvoicesResponse })
  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findByField(
    @Param("field") field: string, // Obtiene el campo de la ruta
    @Query("value") value: string, // Obtiene el valor de la consulta
    @Query() paginationArgs?: PaginationArgs
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const entities = await this.service.findAndCount({
        where: { [field]: value },
        skip:
          ((paginationArgs ? paginationArgs.page : 1) - 1) *
          (paginationArgs ? paginationArgs.size : 25),
        take: paginationArgs ? paginationArgs.size : 25,
      });

      if (!entities) {
        throw new NotFoundException(
          "Invoice no encontrados para la propiedad y valor especificado"
        );
      }
      return entities;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @Get("pagination")
  @ApiOperation({ summary: "Find invoices with pagination" })
  @ApiResponse({ status: 200, type: InvoicesResponse<Invoice> })
  @ApiQuery({ name: "options", required: false, type: InvoiceDto }) // Ajustar según el tipo real
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "size", required: false, type: Number })
  @ApiQuery({ name: "sort", required: false, type: String })
  @ApiQuery({ name: "order", required: false, type: () => Order })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "initDate", required: false, type: Date })
  @ApiQuery({ name: "endDate", required: false, type: Date })
  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findWithPagination(
    @Query() options: FindManyOptions<Invoice>,
    @Query("page") page?: number,
    @Query("size") size?: number,
    @Query("sort") sort?: string,
    @Query("order") order?: Order,
    @Query("search") search?: string,
    @Query("initDate") initDate?: Date,
    @Query("endDate") endDate?: Date
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const paginationArgs: PaginationArgs = PaginationArgs.createPaginator(
        page || 1,
        size || 25,
        sort || "createdAt", // Asigna valor por defecto
        order || Order.asc, // Asigna valor por defecto
        search || "", // Asigna valor por defecto
        initDate || undefined, // Puede ser undefined si no se proporciona
        endDate || undefined // Puede ser undefined si no se proporciona
      );
      const entities = await this.service.findWithPagination(
        options,
        paginationArgs
      );
      if (!entities) {
        throw new NotFoundException("Entidades Invoices no encontradas.");
      }
      return entities;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @Get("count")
  @ApiOperation({ summary: "Count all invoices" })
  @ApiResponse({ status: 200, type: Number })
  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async count(): Promise<number> {
    return this.service.count();
  }

  @Get("search")
  @ApiOperation({ summary: "Find and count invoices with conditions" })
  @ApiResponse({ status: 200, type: InvoicesResponse<Invoice> })
  @ApiQuery({ name: "where", required: true, type: Object }) // Ajustar según el tipo real
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "size", required: false, type: Number })
  @ApiQuery({ name: "sort", required: false, type: String })
  @ApiQuery({ name: "order", required: false, type: () => Order })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "initDate", required: false, type: Date })
  @ApiQuery({ name: "endDate", required: false, type: Date })
  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findAndCount(
    @Query() where: Record<string, any> = {},
    @Query("page") page?: number,
    @Query("size") size?: number,
    @Query("sort") sort?: string,
    @Query("order") order?: Order,
    @Query("search") search?: string,
    @Query("initDate") initDate?: Date,
    @Query("endDate") endDate?: Date
  ): Promise<InvoicesResponse<Invoice>> {
    try {
      const paginationArgs: PaginationArgs = PaginationArgs.createPaginator(
        page || 1,
        size || 25,
        sort || "createdAt", // Asigna valor por defecto
        order || Order.asc, // Asigna valor por defecto
        search || "", // Asigna valor por defecto
        initDate || undefined, // Puede ser undefined si no se proporciona
        endDate || undefined // Puede ser undefined si no se proporciona
      );
      const entities = await this.service.findAndCount({
        where: where,
        paginationArgs: paginationArgs,
      });

      if (!entities) {
        throw new NotFoundException(
          "Entidades Invoices no encontradas para el criterio especificado."
        );
      }
      return entities;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @Get("find-one")
  @ApiOperation({ summary: "Find one invoice with conditions" })
  @ApiResponse({ status: 200, type: InvoiceResponse<Invoice> })
  @ApiQuery({ name: "where", required: true, type: Object }) // Ajustar según el tipo real
  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findOne(
    @Query() where: Record<string, any> = {}
  ): Promise<InvoiceResponse<Invoice>> {
    try {
      const entity = await this.service.findOne({
        where: where,
      });

      if (!entity) {
        throw new NotFoundException("Entidad Invoice no encontrada.");
      }
      return entity;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }

  @Get("find-one-or-fail")
  @ApiOperation({ summary: "Find one invoice or return error" })
  @ApiResponse({ status: 200, type: InvoiceResponse<Invoice> })
  @ApiQuery({ name: "where", required: true, type: Object }) // Ajustar según el tipo real
  @LogExecutionTime({
    layer: "controller",
    callback: async (logData, client) => {
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceQueryService.name)
      .get(InvoiceQueryService.name),
  })
  async findOneOrFail(
    @Query() where: Record<string, any> = {}
  ): Promise<InvoiceResponse<Invoice> | Error> {
    try {
      const entity = await this.service.findOne({
        where: where,
      });

      if (!entity) {
        return new NotFoundException("Entidad Invoice no encontrada.");
      }
      return entity;
    } catch (error) {
      this.#logger.error(error);
      return Helper.throwCachedError(error);
    }
  }
}

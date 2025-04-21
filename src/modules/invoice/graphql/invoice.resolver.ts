import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import {
  InvoiceDto,
  CreateInvoiceDto,
  CreateOrUpdateInvoiceDto,
  InvoiceValueInput,
} from "../dtos/createinvoice.dto";
import { Invoice } from "../entities/invoice.entity";
import {
  CreateInvoiceCommand,
  UpdateInvoiceCommand,
  DeleteInvoiceCommand,
} from "../commands/exporting.command";
import { CommandBus } from "@nestjs/cqrs";
import { InvoiceQueryService } from "../services/invoicequery.service";

import { UpdateInvoiceDto } from "../dtos/updateinvoice.dto";
import { InvoiceResponse, InvoicesResponse } from "../types/invoice.types";
import { FindManyOptions } from "typeorm";
import { PaginationArgs } from "src/common/dto/args/pagination.args";
import { fromObject } from "src/utils/functions";

import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";

//@UseGuards(JwtGraphQlAuthGuard)
@Resolver(() => Invoice)
export class InvoiceResolver {
  //Constructor del resolver de Invoice
  constructor(
    private readonly service: InvoiceQueryService,
    private readonly commandBus: CommandBus
  ) {}

  @LogExecutionTime({
    layer: "resolver",
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
    layer: "resolver",
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
  })
  @Mutation(() => InvoiceResponse<Invoice>)
  async updateInvoice(
    @Args("id", { type: () => String }) id: string,
    @Args("input") input: UpdateInvoiceDto
  ): Promise<InvoiceResponse<Invoice>> {
    return this.commandBus.execute(new UpdateInvoiceCommand(id, input));
  }

  @LogExecutionTime({
    layer: "resolver",
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
          new UpdateInvoiceCommand(
            data.id,
            data.input as CreateInvoiceDto | UpdateInvoiceDto
          )
        );
      }
    }
    return this.commandBus.execute(new CreateInvoiceCommand(data.input));
  }

  @LogExecutionTime({
    layer: "resolver",
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
    layer: "resolver",
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
    layer: "resolver",
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
    layer: "resolver",
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
    layer: "resolver",
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
    layer: "resolver",
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
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
  })
  @Query(() => Number)
  async totalInvoices(): Promise<number> {
    return this.service.count();
  }

  @LogExecutionTime({
    layer: "resolver",
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
    layer: "resolver",
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
    layer: "resolver",
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

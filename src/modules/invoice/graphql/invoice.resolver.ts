import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
<<<<<<< HEAD
<<<<<<< HEAD
import { InvoiceDto, CreateInvoiceDto, CreateOrUpdateInvoiceDto } from "../dtos/createinvoice.dto";
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
import {
  InvoiceDto,
  CreateInvoiceDto,
  CreateOrUpdateInvoiceDto,
  InvoiceValueInput,
} from "../dtos/createinvoice.dto";
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
import { Invoice } from "../entities/invoice.entity";
import {
  CreateInvoiceCommand,
  UpdateInvoiceCommand,
  DeleteInvoiceCommand,
} from "../commands/exporting.command";
import { CommandBus } from "@nestjs/cqrs";
<<<<<<< HEAD
<<<<<<< HEAD
import { UpdateInvoiceDto } from "../dtos/updateinvoice.dto";

import { InvoiceQueryService } from "../services/invoicequery.service";
import { GraphQLJSON } from 'graphql-type-json';

@Resolver(() => InvoiceDto)
export class InvoiceResolver {
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
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
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
  constructor(
    private readonly service: InvoiceQueryService,
    private readonly commandBus: CommandBus
  ) {}

<<<<<<< HEAD
<<<<<<< HEAD
  @Mutation(() => CreateInvoiceDto)
  async createInvoice(
    @Args("input") input: CreateInvoiceDto
  ): Promise<CreateInvoiceDto> {
    return this.commandBus.execute(new CreateInvoiceCommand(input));
  }

  @Mutation(() => UpdateInvoiceDto)
  async updateInvoice(
    @Args("id") id: string,
    @Args("input") input: UpdateInvoiceDto
  ): Promise<UpdateInvoiceDto> {
    return this.commandBus.execute(new UpdateInvoiceCommand(id, input));
  }

  @Mutation(() => InvoiceDto)
async createOrUpdateInvoice(
  @Args('data') data: CreateOrUpdateInvoiceDto,
): Promise<InvoiceDto> {
  if (data.id) {
    const existingInvoice = await this.service.findById(data.id);
    if (existingInvoice) {
      return this.commandBus.execute(
        new UpdateInvoiceCommand(data.id, data.input as UpdateInvoiceDto),
      );
    }
    // Si no existe pero se proporcionó ID, puedes decidir:
    // Opción A: Lanzar error
    //throw new Error('Invoice not found');
    // Opción B: Crear uno nuevo ignorando el ID
    return this.commandBus.execute(new CreateInvoiceCommand(data.input));
  }
  return this.commandBus.execute(new CreateInvoiceCommand(data.input));
}

  @Mutation(() => Boolean)
  async deleteInvoice(@Args("id") id: string): Promise<boolean> {
    return this.commandBus.execute(new DeleteInvoiceCommand(id));
  }

  @Query(() => [InvoiceDto])
  invoices(): Promise<Invoice[]> {
    return this.service.findAll();
  }

  @Query(() => InvoiceDto)
  invoice(@Args("id") id: string): Promise<Invoice | null> {
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
  @LogExecutionTime({
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceResolver.name)

      .get(InvoiceResolver.name),
    })
  @Query(() => InvoicesResponse<Invoice>)
  async invoice(
    @Args("id", { type: () => String }) id: string
  ): Promise<InvoiceResponse<Invoice>> {
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
    return this.service.findById(id);
  }


<<<<<<< HEAD
<<<<<<< HEAD
  @Query(() => [InvoiceDto])
  async invoicesByField(
  @Args("field") field: string,
  @Args("value") value: any,
  @Args("page", { defaultValue: 1 }) page: number,
  @Args("limit", { defaultValue: 10 }) limit: number,
): Promise<Invoice[]> {
  return this.service.findByField(field, value, page, limit);
}

@Query(() => [InvoiceDto])
async invoicesWithPagination(
  @Args("page", { defaultValue: 1 }) page: number,
  @Args("limit", { defaultValue: 10 }) limit: number,
): Promise<Invoice[]> {
  return this.service.findWithPagination({}, page, limit);
}

@Query(() => Number)
async totalInvoices(): Promise<number> {
  return this.service.count();
}


@Query(() => [InvoiceDto])
async searchInvoices(
  @Args("where", { type: () => GraphQLJSON, nullable: true }) where?: Record<string, any>,
): Promise<Invoice[]> {
  const [invoices] = await this.service.findAndCount(where);
  return invoices;
}


@Query(() => InvoiceDto, { nullable: true })
async findOneInvoice(
  @Args("where", { type: () => GraphQLJSON, nullable: true }) where?: Record<string, any>,
): Promise<Invoice | null> {
  return this.service.findOne(where);
}

@Query(() => InvoiceDto)
async findOneInvoiceOrFail(
  @Args("where", { type: () => GraphQLJSON }) where: Record<string, any>,
): Promise<Invoice> {
  return this.service.findOneOrFail(where);
}

}

=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
@LogExecutionTime({
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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
    layer: 'resolver',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
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


<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)

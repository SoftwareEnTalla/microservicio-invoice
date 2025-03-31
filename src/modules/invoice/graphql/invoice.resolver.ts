import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { InvoiceDto, CreateInvoiceDto, CreateOrUpdateInvoiceDto } from "../dtos/createinvoice.dto";
import { Invoice } from "../entities/invoice.entity";
import {
  CreateInvoiceCommand,
  UpdateInvoiceCommand,
  DeleteInvoiceCommand,
} from "../commands/exporting.command";
import { CommandBus } from "@nestjs/cqrs";
import { UpdateInvoiceDto } from "../dtos/updateinvoice.dto";

import { InvoiceQueryService } from "../services/invoicequery.service";
import { GraphQLJSON } from 'graphql-type-json';

@Resolver(() => InvoiceDto)
export class InvoiceResolver {
  constructor(
    private readonly service: InvoiceQueryService,
    private readonly commandBus: CommandBus
  ) {}

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
    return this.service.findById(id);
  }


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


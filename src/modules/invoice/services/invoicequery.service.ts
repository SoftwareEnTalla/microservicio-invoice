import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOptionsWhere,
} from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { BaseEntity } from '../entities/base.entity';
import { InvoiceQueryRepository } from '../repositories/invoicequery.repository';

@Injectable()
export class InvoiceQueryService {
  constructor(
    
    private readonly repository: InvoiceQueryRepository
  ) {
    this.validate();
  }

  private validate(): void {
    const entityInstance = Object.create(Invoice.prototype);

    if (!(entityInstance instanceof BaseEntity)) {
      throw new Error(
        `El tipo ${Invoice.name} no extiende de BaseEntity. Asegúrate de que todas las entidades hereden correctamente.`
      );
    }
  }

  async findAll(options?: FindManyOptions<Invoice>): Promise<Invoice[]> {
    return this.repository.findAll(options);
  }

  async findById(id: string): Promise<Invoice | null> {
    const tmp: FindOptionsWhere<Invoice> = { id } as FindOptionsWhere<Invoice>;
    return this.repository.findById(tmp);
  }

  async findByField(
    field: string,
    value: any,
    page: number,
    limit: number
  ): Promise<Invoice[]> {
    const [entities] = await this.repository.findAndCount({
      where: { [field]: value },
      skip: (page - 1) * limit,
      take: limit,
    });
    return entities;
  }

  async findWithPagination(
    options: FindManyOptions<Invoice>,
    page: number,
    limit: number
  ): Promise<Invoice[]> {
     return this.repository.findWithPagination(options,page,limit);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async findAndCount(where?: Record<string, any>): Promise<[Invoice[], number]> {
    return this.repository.findAndCount({
      where: where,
    });
  }

  async findOne(where?: Record<string, any>): Promise<Invoice | null> {
    return this.repository.findOne({
      where: where,
    });
  }

  async findOneOrFail(where?: Record<string, any>): Promise<Invoice> {
    const entity = await this.repository.findOne({
      where: where,
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return entity;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOptionsWhere,
  In,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoiceQueryRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly repository: Repository<Invoice>
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
    return this.repository.find(options);
  }

  async findById(id: string): Promise<Invoice | null> {
    const tmp: FindOptionsWhere<Invoice> = { id } as FindOptionsWhere<Invoice>;
    return this.repository.findOneBy(tmp);
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
    const skip = (page - 1) * limit;
    return this.repository.find({ ...options, skip, take: limit });
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

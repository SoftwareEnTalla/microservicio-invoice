import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';


import { BaseEntity } from '../entities/base.entity';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceQueryRepository } from './invoicequery.repository';
import { UpdateInvoiceDto } from '../dtos/updateinvoice.dto';
import { CreateInvoiceDto } from '../dtos/createinvoice.dto';
import { generateCacheKey } from 'src/utils/functions';

@Injectable()
export class InvoiceCommandRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly repository: Repository<Invoice>,
    private readonly invoiceRepository: InvoiceQueryRepository
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
  
  @Cacheable({ key: (args) => generateCacheKey<Invoice>('createInvoice',args[0], args[1]), ttl: 60 })
  async create(entity: Invoice): Promise<Invoice> {
    return this.repository.save(entity);
  }

  @Cacheable({ key: (args) => generateCacheKey<Invoice>('createInvoices',args[0], args[1]), ttl: 60 })
  async bulkCreate(entities: Invoice[]): Promise<Invoice[]> {
    return this.repository.save(entities);
  }

 
  @Cacheable({ key: (args) => generateCacheKey<Invoice>('updateInvoice',args[0], args[1]), ttl: 60 })
  async update(
    id: string,
    partialEntity: Partial<Invoice>
  ): Promise<Invoice | null> {
    let result: UpdateResult = await this.repository.update(id, partialEntity);
    return this.invoiceRepository.findById(id);
  }
   @Cacheable({ key: (args) => generateCacheKey<Invoice>('updateInvoices',args[0], args[1]), ttl: 60 })
  async bulkUpdate(entities: Partial<Invoice>[]): Promise<Invoice[]> {
    const updatedEntities: Invoice[] = [];
    for (const entity of entities) {
      if (entity.id) {
        const updatedEntity = await this.update(entity.id, entity);
        if (updatedEntity) {
          updatedEntities.push(updatedEntity);
        }
      }
    }
    return updatedEntities;
  }
  @Cacheable({ key: (args) => generateCacheKey<string>('deleteInvoice',args[0]), ttl: 60 })
  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ id });
  }
  @Cacheable({ key: (args) => generateCacheKey<string[]>('deleteInvoices',args[0]), ttl: 60 })
  async bulkDelete(ids: string[]): Promise<DeleteResult> {
    return await this.repository.delete(ids);
  }
}

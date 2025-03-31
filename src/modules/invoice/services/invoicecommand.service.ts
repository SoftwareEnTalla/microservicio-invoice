import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { CreateInvoiceDto } from '../dtos/createinvoice.dto';
import { UpdateInvoiceDto } from '../dtos/updateinvoice.dto';
import { DeleteInvoiceDto } from '../dtos/deleteinvoice.dto';
import { generateCacheKey } from 'src/utils/functions';
import { InvoiceCommandRepository } from '../repositories/invoicecommand.repository';
import { InvoiceQueryRepository } from '../repositories/invoicequery.repository';

@Injectable()
export class InvoiceCommandService {
  constructor(
    private readonly repository: InvoiceCommandRepository,
    private readonly queryRepository: InvoiceQueryRepository
  ) {}
  @Cacheable({ key: (args) => generateCacheKey<CreateInvoiceDto>('createInvoice',args[0], args[1]), ttl: 60 })
  async create(entity: CreateInvoiceDto): Promise<Invoice> {
    return this.repository.create(Invoice.fromDto(entity));
  }
  @Cacheable({ key: (args) => generateCacheKey<Invoice>('createInvoices',args[0], args[1]), ttl: 60 })
  async bulkCreate(entities: CreateInvoiceDto[]): Promise<Invoice[]> {
    return this.repository.bulkCreate(entities.map((entity) => Invoice.fromDto(entity)));
  }
  @Cacheable({ key: (args) => generateCacheKey<UpdateInvoiceDto>('updateInvoice',args[0], args[1]), ttl: 60 })
  async update(id: string, partialEntity:  UpdateInvoiceDto): Promise<Invoice | null> {
     return await this.repository.update(id, Invoice.fromDto(partialEntity)); 
  }
  @Cacheable({ key: (args) => generateCacheKey<UpdateInvoiceDto>('updateInvoices',args[0]), ttl: 60 })
  async bulkUpdate(partialEntity: UpdateInvoiceDto[]): Promise<Invoice[] | null> {
    return await this.repository.bulkUpdate(partialEntity.map((entity) => Invoice.fromDto(entity))); 
  }
  @Cacheable({ key: (args) => generateCacheKey<DeleteInvoiceDto>('deleteInvoice',args[0], args[1]), ttl: 60 })
  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
  @Cacheable({ key: (args) => generateCacheKey<string[]>('deleteInvoices',args[0]), ttl: 60 })
  async bulkDelete(ids: string[]): Promise<DeleteResult> {
    return await this.repository.bulkDelete(ids)
  }
}

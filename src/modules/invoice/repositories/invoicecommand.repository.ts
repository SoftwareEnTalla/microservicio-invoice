import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  Repository,
  UpdateResult,
} from 'typeorm';


import { BaseEntity } from '../entities/base.entity';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceQueryRepository } from './invoicequery.repository';
import { generateCacheKey } from 'src/utils/functions';
import { Cacheable } from '../decorators/cache.decorator';
import {InvoiceRepository} from './invoice.repository';

//Logger
import { LogExecutionTime } from 'src/common/logger/loggers.functions';
import { LoggerClient } from 'src/common/logger/logger.client';


@Injectable()
export class InvoiceCommandRepository {

  //Constructor del repositorio de datos: InvoiceCommandRepository
  constructor(
    @InjectRepository(Invoice)
    private readonly repository: Repository<Invoice>,
    private readonly invoiceRepository: InvoiceQueryRepository
  ) {
    this.validate();
  }

  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  private validate(): void {
    const entityInstance = Object.create(Invoice.prototype);

    if (!(entityInstance instanceof BaseEntity)) {
      throw new Error(
        `El tipo ${Invoice.name} no extiende de BaseEntity. Asegúrate de que todas las entidades hereden correctamente.`
      );
    }
  }
  
  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<Invoice>('createInvoice',args[0], args[1]), ttl: 60 })
  async create(entity: Invoice): Promise<Invoice> {
    return this.repository.save(entity);
  }


  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<Invoice[]>('createInvoices',args[0], args[1]), ttl: 60 })
  async bulkCreate(entities: Invoice[]): Promise<Invoice[]> {
    return this.repository.save(entities);
  }

  
  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<Invoice>('updateInvoice',args[0], args[1]), ttl: 60 })
  async update(
    id: string,
    partialEntity: Partial<Invoice>
  ): Promise<Invoice | null> {
    let result: UpdateResult = await this.repository.update(id, partialEntity);
    return this.invoiceRepository.findById(id);
  }


  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<Invoice[]>('updateInvoices',args[0], args[1]), ttl: 60 })
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


  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<string>('deleteInvoice',args[0]), ttl: 60 })
  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ id });
  }


  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      return await client.send(logData);
    },
    client: new LoggerClient()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<string[]>('deleteInvoices',args[0]), ttl: 60 })
  async bulkDelete(ids: string[]): Promise<DeleteResult> {
    return await this.repository.delete(ids);
  }
}

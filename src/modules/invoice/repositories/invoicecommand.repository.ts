/*
 * Copyright (c) 2025 SoftwarEnTalla
 * Licencia: MIT
 * Contacto: softwarentalla@gmail.com
 * CEOs: 
 *       Persy Morell Guerra      Email: pmorellpersi@gmail.com  Phone : +53-5336-4654 Linkedin: https://www.linkedin.com/in/persy-morell-guerra-288943357/
 *       Dailyn García Domínguez  Email: dailyngd@gmail.com      Phone : +53-5432-0312 Linkedin: https://www.linkedin.com/in/dailyn-dominguez-3150799b/
 *
 * CTO: Persy Morell Guerra
 * COO: Dailyn García Domínguez and Persy Morell Guerra
 * CFO: Dailyn García Domínguez and Persy Morell Guerra
 *
 * Repositories: 
 *               https://github.com/SoftwareEnTalla 
 *
 *               https://github.com/apokaliptolesamale?tab=repositories
 *
 *
 * Social Networks:
 *
 *              https://x.com/SoftwarEnTalla
 *
 *              https://www.facebook.com/profile.php?id=61572625716568
 *
 *              https://www.instagram.com/softwarentalla/
 *              
 *
 *
 */
import { Injectable, NotFoundException } from '@nestjs/common';
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
import { logger } from '@core/logs/logger';

//Events and EventHandlers
import { IEventHandler } from '@nestjs/cqrs';
import { InvoiceCreatedEvent } from '../events/invoicecreated.event';
import { InvoiceUpdatedEvent } from '../events/invoiceupdated.event';
import { InvoiceDeletedEvent } from '../events/invoicedeleted.event';

//Enfoque Event Sourcing
import { CommandBus } from '@nestjs/cqrs';
import { EventStoreService } from '../shared/event-store/event-store.service';
import { KafkaEventPublisher } from '../shared/adapters/kafka-event-publisher';
import { BaseEvent } from '../events/base.event';


@Injectable()
export class InvoiceCommandRepository implements IEventHandler<BaseEvent>{

  //Constructor del repositorio de datos: InvoiceCommandRepository
  constructor(
    @InjectRepository(Invoice)
    private readonly repository: Repository<Invoice>,
    private readonly invoiceRepository: InvoiceQueryRepository,
    private readonly commandBus: CommandBus,
    private readonly eventStore: EventStoreService,
    private readonly eventPublisher: KafkaEventPublisher
  ) {
    this.validate();
  }

  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
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


  // ----------------------------
  // MÉTODOS DE PROYECCIÓN (Event Handlers) para enfoque Event Sourcing
  // ----------------------------

  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  async handle(event: any) {
    logger.info('Ready to handle Invoice event on repository:', event);
    switch (event.constructor.name) {
      case 'InvoiceCreatedEvent':
        return await this.onInvoiceCreated(event);
      case 'InvoiceUpdatedEvent':
        return await this.onInvoiceUpdated(event);
      case 'InvoiceDeletedEvent':
        return await this.onInvoiceDeleted(event);
      // Añade más casos según necesites
    }
    return false;
  }

  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({
    key: (args) => generateCacheKey<Invoice>('createInvoice', args[0], args[1]),
    ttl: 60,
  })
  private async onInvoiceCreated(event: InvoiceCreatedEvent) {
    logger.info('Ready to handle onInvoiceCreated event on repository:', event);
    const entity = new Invoice();
    entity.id = event.aggregateId;
    // Mapea todos los campos del evento a la entidad
    Object.assign(entity, event.payload.instance);
    logger.info('Ready to save entity from event\'s payload:', entity);
    return await this.repository.save(entity);
    // Limpia caché si es necesario
  }

  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({
    key: (args) => generateCacheKey<Invoice>('updateInvoice', args[0], args[1]),
    ttl: 60,
  })
  private async onInvoiceUpdated(event: InvoiceUpdatedEvent) {
    logger.info('Ready to handle onInvoiceUpdated event on repository:', event);
    return await this.repository.update(
      event.aggregateId,
      event.payload.instance
    );
    // Limpia caché relacionada
  }

  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({
    key: (args) => generateCacheKey<Invoice>('deleteInvoice', args[0], args[1]),
    ttl: 60,
  })
  private async onInvoiceDeleted(event: InvoiceDeletedEvent) {
    logger.info('Ready to handle onInvoiceDeleted event on repository:', event);
    return await this.repository.delete(event.aggregateId);
    // Limpia caché
  }


  // ----------------------------
  // MÉTODOS CRUD TRADICIONALES (Compatibilidad)
  // ----------------------------
 
  
  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<Invoice>('createInvoice',args[0], args[1]), ttl: 60 })
  async create(entity: Invoice): Promise<Invoice> {
    logger.info('Ready to create Invoice on repository:', entity);
    const result = await this.repository.save(entity);
    logger.info('New instance of Invoice was created with id:'+ result.id+' on repository:', result);
    this.eventPublisher.publish(new InvoiceCreatedEvent(result.id, {
      instance: result,
      metadata: {
        initiatedBy: result.creator,
        correlationId: result.id,
      },
    }));
    return result;
  }


  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<Invoice[]>('createInvoices',args[0], args[1]), ttl: 60 })
  async bulkCreate(entities: Invoice[]): Promise<Invoice[]> {
    logger.info('Ready to create Invoice on repository:', entities);
    const result = await this.repository.save(entities);
    logger.info('New '+entities.length+' instances of Invoice was created on repository:', result);
    this.eventPublisher.publishAll(result.map((el)=>new InvoiceCreatedEvent(el.id, {
      instance: el,
      metadata: {
        initiatedBy: el.creator,
        correlationId: el.id,
      },
    })));
    return result;
  }

  
  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<Invoice>('updateInvoice',args[0], args[1]), ttl: 60 })
  async update(
    id: string,
    partialEntity: Partial<Invoice>
  ): Promise<Invoice | null> {
    logger.info('Ready to update Invoice on repository:', partialEntity);
    let result = await this.repository.update(id, partialEntity);
    logger.info('update Invoice on repository was successfully :', partialEntity);
    let instance=await this.invoiceRepository.findById(id);
    logger.info('Updated instance of Invoice with id:  was finded on repository:', instance);
    if(instance){
     logger.info('Ready to publish or fire event InvoiceUpdatedEvent on repository:', instance);
     this.eventPublisher.publish(new InvoiceUpdatedEvent(instance.id, {
          instance: instance,
          metadata: {
            initiatedBy: instance.createdBy || 'system',
            correlationId: id,
          },
        }));
    }   
    return instance;
  }


  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<Invoice[]>('updateInvoices',args[0], args[1]), ttl: 60 })
  async bulkUpdate(entities: Partial<Invoice>[]): Promise<Invoice[]> {
    const updatedEntities: Invoice[] = [];
    logger.info('Ready to update '+entities.length+' entities on repository:', entities);
    for (const entity of entities) {
      if (entity.id) {
        const updatedEntity = await this.update(entity.id, entity);
        if (updatedEntity) {
          updatedEntities.push(updatedEntity);
          this.eventPublisher.publish(new InvoiceUpdatedEvent(updatedEntity.id, {
              instance: updatedEntity,
              metadata: {
                initiatedBy: updatedEntity.createdBy || 'system',
                correlationId: entity.id,
              },
            }));
        }
      }
    }
    logger.info('Already updated '+updatedEntities.length+' entities on repository:', updatedEntities);
    return updatedEntities;
  }


  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<string>('deleteInvoice',args[0]), ttl: 60 })
  async delete(id: string): Promise<DeleteResult> {
     logger.info('Ready to delete  entity with id:  on repository:', id);
     const entity = await this.invoiceRepository.findOne({ id });
     if(!entity){
      throw new NotFoundException(`No se encontro el id: ${id}`);
     }
     const result = await this.repository.delete({ id });
     logger.info('Entity deleted with id:  on repository:', result);
     logger.info('Ready to publish/fire InvoiceDeletedEvent on repository:', result);
     this.eventPublisher.publish(new InvoiceDeletedEvent(id, {
      instance: entity,
      metadata: {
        initiatedBy: entity.createdBy || 'system',
        correlationId: entity.id,
      },
    }));
     return result;
  }


  @LogExecutionTime({
    layer: 'repository',
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({ key: (args) => generateCacheKey<string[]>('deleteInvoices',args[0]), ttl: 60 })
  async bulkDelete(ids: string[]): Promise<DeleteResult> {
    logger.info('Ready to delete '+ids.length+' entities on repository:', ids);
    const result = await this.repository.delete(ids);
    logger.info('Already deleted '+ids.length+' entities on repository:', result);
    logger.info('Ready to publish/fire InvoiceDeletedEvent on repository:', result);
    this.eventPublisher.publishAll(ids.map(async (id) => {
        const entity = await this.invoiceRepository.findOne({ id });
        if(!entity){
          throw new NotFoundException(`No se encontro el id: ${id}`);
        }
        return new InvoiceDeletedEvent(id, {
          instance: entity,
          metadata: {
            initiatedBy: entity.createdBy || 'system',
            correlationId: entity.id,
          },
        });
      }));
    return result;
  }
}



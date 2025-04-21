import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  FindManyOptions,
  FindOptionsWhere,
  In,
  MoreThanOrEqual,
  Repository,
  DeleteResult,
  UpdateResult,
} from "typeorm";

import { BaseEntity } from "../entities/base.entity";
import { Invoice } from "../entities/invoice.entity";
import { Cacheable } from "../decorators/cache.decorator";
import { generateCacheKey } from "src/utils/functions";

//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly repository: Repository<Invoice>
  ) {
    this.validate();
  }

  @LogExecutionTime({
    layer: "repository",
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

  //Funciones de Query-Repositories
  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  async findAll(options?: FindManyOptions<Invoice>): Promise<Invoice[]> {
    return this.repository.find(options);
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  async findById(id: string): Promise<Invoice | null> {
    const tmp: FindOptionsWhere<Invoice> = { id } as FindOptionsWhere<Invoice>;
    return this.repository.findOneBy(tmp);
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
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

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  async findWithPagination(
    options: FindManyOptions<Invoice>,
    page: number,
    limit: number
  ): Promise<Invoice[]> {
    const skip = (page - 1) * limit;
    return this.repository.find({ ...options, skip, take: limit });
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  async count(): Promise<number> {
    return this.repository.count();
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  async findAndCount(
    where?: Record<string, any>
  ): Promise<[Invoice[], number]> {
    return this.repository.findAndCount({
      where: where,
    });
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  async findOne(where?: Record<string, any>): Promise<Invoice | null> {
    return this.repository.findOne({
      where: where,
    });
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  async findOneOrFail(where?: Record<string, any>): Promise<Invoice> {
    const entity = await this.repository.findOne({
      where: where,
    });
    if (!entity) {
      throw new Error("Entity not found");
    }
    return entity;
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  //Funciones de Command-Repositories
  @Cacheable({
    key: (args) => generateCacheKey<Invoice>("createInvoice", args[0], args[1]),
    ttl: 60,
  })
  async create(entity: Invoice): Promise<Invoice> {
    return this.repository.save(entity);
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<Invoice[]>("createInvoices", args[0], args[1]),
    ttl: 60,
  })
  async bulkCreate(entities: Invoice[]): Promise<Invoice[]> {
    return this.repository.save(entities);
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({
    key: (args) => generateCacheKey<Invoice>("updateInvoice", args[0], args[1]),
    ttl: 60,
  })
  async update(
    id: string,
    partialEntity: Partial<Invoice>
  ): Promise<Invoice | null> {
    let result: UpdateResult = await this.repository.update(id, partialEntity);
    return this.repository.findOneBy({ id: id });
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<Invoice[]>("updateInvoices", args[0], args[1]),
    ttl: 60,
  })
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
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({
    key: (args) => generateCacheKey<string>("deleteInvoice", args[0]),
    ttl: 60,
  })
  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ id });
  }

  @LogExecutionTime({
    layer: "repository",
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
      .registerClient(InvoiceRepository.name)
      .get(InvoiceRepository.name),
  })
  @Cacheable({
    key: (args) => generateCacheKey<string[]>("deleteInvoices", args[0]),
    ttl: 60,
  })
  async bulkDelete(ids: string[]): Promise<DeleteResult> {
    return await this.repository.delete(ids);
  }
}

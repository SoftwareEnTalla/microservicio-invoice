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


import { Injectable, OnModuleDestroy, Logger } from "@nestjs/common";
import { Kafka, Producer, Consumer, Admin } from "kafkajs";
import { KafkaMessageCallback } from "../../../../interfaces/kafka";
import { logger } from '@core/logs/logger';

@Injectable()
export class KafkaService implements OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private readonly moduleMessagingKey = 'invoice';
  private readonly kafkaClientId: string;
  private readonly kafkaGroupId: string;
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private connected: boolean = false;

  private adminClient: Admin | null = null;

  constructor() {
    const brokers = ((process.env.KAFKA_BROKERS || 'kafka:9092').split(',').map((broker) => broker.trim()).filter(Boolean));
    const baseClientId = (process.env.KAFKA_CLIENT_ID || 'nestjs-client').trim();
    const baseGroupId = (process.env.KAFKA_GROUP_ID || 'nestjs-group').trim();
    this.kafkaClientId = baseClientId + '-' + this.moduleMessagingKey;
    this.kafkaGroupId = baseGroupId + '-' + this.moduleMessagingKey;
    this.kafka = new Kafka({
      clientId: this.kafkaClientId,
      brokers,
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: this.kafkaGroupId });
    this.adminClient = this.kafka.admin();
  }

  async connect() {
    if (this.connected) {
      return;
    }
    await Promise.all([this.producer.connect(), this.consumer.connect()]);
    this.connected = true;
  }

  private async isAdminConnected(): Promise<boolean> {
    try {
      await this.adminClient?.describeCluster();
      return true;
    } catch {
      return false;
    }
  }

  async disconnectAdmin(): Promise<void> {
    try {
      await this.adminClient?.disconnect();
      this.adminClient = null;
    } catch (error) {
      this.logger.error("Error disconnecting Admin client", error);
    }
  }
  /**
   * Obtiene el cliente Admin de Kafka con conexión establecida
   * @returns {Promise<Admin>} Instancia conectada de Kafka Admin
   */
  async getAdminClient(): Promise<Admin | null> {
    try {
      // Verifica si ya está conectado
      if (this.adminClient !== null) {
        const connected = await this.adminClient?.describeCluster();
        this.logger.debug("Admin client already connected");
        return this.adminClient;
      }
      return null;
    } catch (error) {
      // Si no está conectado, establece conexión
      this.logger.warn("Admin client not connected, attempting to connect...");
      await this.adminClient?.connect();
      this.logger.log("Admin client connected successfully");
      return this.adminClient;
    }
  }
  async sendMessage(
    topic: string,
    message: any,
    options?: { key?: string; headers?: Record<string, any> }
  ) {
    await this.connect();
    const baseHeaders: Record<string, any> = {
      "event-type": message?.constructor?.name || "unknown",
      timestamp: new Date().toISOString(),
    };
    const mergedHeaders = { ...baseHeaders, ...(options?.headers || {}) };
    // Kafka headers must be string | Buffer; coerce non-undefined values to string
    const finalHeaders: Record<string, string> = {};
    for (const k of Object.keys(mergedHeaders)) {
      const v = mergedHeaders[k];
      if (v === undefined || v === null) continue;
      finalHeaders[k] = typeof v === "string" ? v : String(v);
    }
    await this.producer.send({
      topic,
      messages: [
        {
          ...(options?.key ? { key: options.key } : {}),
          value: JSON.stringify(message),
          headers: finalHeaders,
        },
      ],
    });
  }

  async subscribe<T = any>(
    topic: string | string[],
    callback: KafkaMessageCallback<T>
  ): Promise<void> {
    await this.connect();
    await this.consumer.subscribe({
      topics: Array.isArray(topic) ? topic : [topic],
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          if (!message.value) return;

          const parsedMessage: T = JSON.parse(message.value.toString());
          await callback(parsedMessage, {
            topic,
            partition,
            offset: message.offset,
            headers: message.headers,
            timestamp: message.timestamp,
          });
        } catch (error) {
          logger.error("Error processing Kafka message:", error);
          // Aquí puedes agregar lógica de reintento o dead-letter queue
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  async disconnect() {
    await Promise.all([this.producer.disconnect(), this.consumer.disconnect()]);
    this.connected = false;
  }
}


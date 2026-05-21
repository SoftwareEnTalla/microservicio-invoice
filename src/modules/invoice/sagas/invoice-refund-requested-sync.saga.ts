import { Injectable, Logger } from '@nestjs/common';
import { Saga, CommandBus, EventBus, ofType } from '@nestjs/cqrs';
import { Observable, map, tap } from 'rxjs';
import { RefundRequestedEvent } from '../events/refundrequested.event';
import { ReturnRestockedEvent } from '../events/returnrestocked.event';
import { SagaInvoiceFailedEvent } from '../events/invoice-failed.event';
import { UpdateInvoiceCommand } from '../commands/exporting.command';
import { LogExecutionTime } from 'src/common/logger/loggers.functions';
import { LoggerClient } from 'src/common/logger/logger.client';
import { logger } from '@core/logs/logger';
import { InvoiceQueryRepository } from '../repositories/invoicequery.repository';
import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoiceRefundRequestedSyncSaga {
  private readonly logger = new Logger(InvoiceRefundRequestedSyncSaga.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly invoiceQueryRepository: InvoiceQueryRepository,
  ) {}

  @Saga()
  onRefundRequested = ($events: Observable<RefundRequestedEvent>) => {
    return $events.pipe(
      ofType(RefundRequestedEvent),
      tap(event => {
        this.logger.log(`Saga invoice-refund-requested-sync recibió RefundRequested: ${event.aggregateId}`);
        void this.handleRefundSignal(event);
      }),
      map(() => null)
    );
  };

  @Saga()
  onReturnRestocked = ($events: Observable<ReturnRestockedEvent>) => {
    return $events.pipe(
      ofType(ReturnRestockedEvent),
      tap(event => {
        this.logger.log(`Saga invoice-refund-requested-sync recibió ReturnRestocked: ${event.aggregateId}`);
        void this.handleRefundSignal(event);
      }),
      map(() => null)
    );
  };

  @LogExecutionTime({
    layer: 'saga',
    callback: async (logData, client) => {
      try {
        logger.info('Codetrace saga event:', [logData, client]);
        return await client.send(logData);
      } catch (error) {
        logger.info('Error enviando traza de saga:', logData);
        throw error;
      }
    },
    client: LoggerClient.getInstance().registerClient(InvoiceRefundRequestedSyncSaga.name).get(InvoiceRefundRequestedSyncSaga.name),
  })
  private async handleRefundSignal(event: RefundRequestedEvent | ReturnRestockedEvent): Promise<void> {
    try {
      const instance = event?.payload?.instance ?? {};
      const refundStatus = String(instance?.refundStatus ?? '').trim().toUpperCase();
      const orderId = String(instance?.orderId ?? '').trim();
      if (!orderId || (event instanceof ReturnRestockedEvent && refundStatus !== 'REQUESTED')) {
        return;
      }

      const [invoices] = await this.invoiceQueryRepository.findAndCount({ orderId });
      if (!invoices.length) {
        return;
      }

      for (const invoice of invoices) {
        const currentStatus = String((invoice as any)?.status ?? '').trim().toUpperCase();
        await this.commandBus.execute(
          new UpdateInvoiceCommand(
            {
              id: invoice.id,
              fiscalAuditStatus: 'IN_REVIEW',
              status: currentStatus === 'REFUNDED' ? 'REFUNDED' : 'ADJUSTED',
              fiscalAuditReference: String(event?.payload?.metadata?.correlationId ?? event?.aggregateId),
            },
            this.buildCommandMetadata(event, invoice),
          ),
        );
      }
    } catch (error: any) {
      this.logger.error(`Error en invoice-refund-requested-sync: ${error.message}`);
      this.eventBus.publish(new SagaInvoiceFailedEvent(error, event));
    }
  }

  private buildCommandMetadata(event: RefundRequestedEvent | ReturnRestockedEvent, invoice: Invoice) {
    const sourceMetadata = event?.payload?.metadata ?? {};
    return {
      instance: invoice,
      metadata: {
        ...sourceMetadata,
        correlationId: sourceMetadata?.correlationId ?? event?.aggregateId,
        causationId: sourceMetadata?.eventId ?? sourceMetadata?.correlationId ?? event?.aggregateId,
        saga: 'invoice-refund-requested-sync',
      },
    };
  }
}
import { Injectable, Optional } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

type InvoiceLifecycleRow = {
  id: string;
  name: string;
  invoiceNumber: string | null;
  orderId: string | null;
  paymentId: string | null;
  status: string | null;
  documentStatus: string | null;
  fiscalAuditStatus: string | null;
  fiscalAuditReference: string | null;
  documentClosureStage: string | null;
  totalAmount: number;
  currency: string | null;
  issuedAt: string | null;
  dueAt: string | null;
  paidAt: string | null;
  creationDate: string | null;
  modificationDate: string | null;
};

@Injectable()
export class InvoiceLifecycleService {
  constructor(
    @Optional() @InjectDataSource() private readonly dataSource: DataSource | undefined,
  ) {}

  async getSummary(limit: number = 8): Promise<Record<string, unknown>> {
    const dataSource = this.resolveDataSource();
    if (!dataSource) {
      return {
        ok: true,
        message: 'Resumen documental de invoices obtenido con éxito.',
        data: {
          totals: {
            totalInvoices: 0,
            draftInvoices: 0,
            issuedInvoices: 0,
            paidInvoices: 0,
            cancelledInvoices: 0,
            sentDocuments: 0,
            auditedInvoices: 0,
            pendingAuditInvoices: 0,
            linkedOrdersInvoices: 0,
            linkedPaymentsInvoices: 0,
            overdueInvoices: 0,
            collectibleInvoices: 0,
            documentClosureReadyInvoices: 0,
            issuanceRatePercent: 0,
          },
          latest: [],
        },
      };
    }

    const safeLimit = Math.max(1, Math.min(limit, 20));
    const [totals] = await dataSource.query(
      `SELECT
         COUNT(*)::int AS "totalInvoices",
         COUNT(*) FILTER (WHERE UPPER(COALESCE(status, 'DRAFT')) = 'DRAFT')::int AS "draftInvoices",
         COUNT(*) FILTER (WHERE UPPER(COALESCE(status, '')) = 'ISSUED')::int AS "issuedInvoices",
         COUNT(*) FILTER (WHERE UPPER(COALESCE(status, '')) = 'PAID')::int AS "paidInvoices",
         COUNT(*) FILTER (WHERE UPPER(COALESCE(status, '')) = 'CANCELLED')::int AS "cancelledInvoices",
         COUNT(*) FILTER (WHERE UPPER(COALESCE("documentStatus", '')) IN ('SENT', 'DELIVERED', 'ACCEPTED'))::int AS "sentDocuments",
         COUNT(*) FILTER (WHERE UPPER(COALESCE("fiscalAuditStatus", '')) IN ('APPROVED', 'COMPLETED', 'AUDITED'))::int AS "auditedInvoices",
         COUNT(*) FILTER (WHERE UPPER(COALESCE("fiscalAuditStatus", 'PENDING')) = 'PENDING')::int AS "pendingAuditInvoices",
         COUNT(*) FILTER (WHERE COALESCE(NULLIF("orderId"::text, ''), '') <> '')::int AS "linkedOrdersInvoices",
         COUNT(*) FILTER (WHERE COALESCE(NULLIF("paymentId"::text, ''), '') <> '')::int AS "linkedPaymentsInvoices",
         COUNT(*) FILTER (WHERE COALESCE("dueAt", NULL) IS NOT NULL AND "dueAt" < CURRENT_DATE AND COALESCE("paidAt", NULL) IS NULL AND UPPER(COALESCE(status, '')) NOT IN ('PAID','CANCELLED'))::int AS "overdueInvoices",
         COUNT(*) FILTER (WHERE UPPER(COALESCE(status, '')) = 'ISSUED' AND COALESCE("paidAt", NULL) IS NULL)::int AS "collectibleInvoices",
         COUNT(*) FILTER (WHERE UPPER(COALESCE("documentStatus", '')) IN ('DELIVERED','ACCEPTED') AND COALESCE("paidAt", NULL) IS NOT NULL)::int AS "documentClosureReadyInvoices"
       FROM invoice
       WHERE COALESCE("isActive", true) = true`,
    );

    const latest = await dataSource.query(
            `SELECT id, name, "invoiceNumber", "orderId", "paymentId", status, "documentStatus", "fiscalAuditStatus", "fiscalAuditReference",
              CASE
                WHEN UPPER(COALESCE("documentStatus", '')) IN ('DELIVERED', 'ACCEPTED') AND COALESCE("paidAt", NULL) IS NOT NULL THEN 'READY_FOR_PAYOUT_CLOSURE'
                WHEN COALESCE("paidAt", NULL) IS NOT NULL THEN 'PAID_PENDING_DOCUMENT'
                WHEN COALESCE(NULLIF("paymentId"::text, ''), '') <> '' THEN 'PAYMENT_LINKED'
                WHEN COALESCE(NULLIF("orderId"::text, ''), '') <> '' THEN 'ORDER_LINKED'
                WHEN UPPER(COALESCE(status, 'DRAFT')) = 'ISSUED' THEN 'ISSUED_PENDING_COLLECTION'
                ELSE 'DRAFT_PENDING_CONTINUITY'
              END AS "documentClosureStage",
              COALESCE("totalAmount", 0)::float AS "totalAmount", currency, "issuedAt", "dueAt", "paidAt", "creationDate", "modificationDate"
       FROM invoice
       WHERE COALESCE("isActive", true) = true
       ORDER BY COALESCE("modificationDate", "creationDate") DESC
       LIMIT $1`,
      [safeLimit],
    );

    const totalInvoices = Number(totals?.totalInvoices ?? 0);
    const issuedInvoices = Number(totals?.issuedInvoices ?? 0);
    const paidInvoices = Number(totals?.paidInvoices ?? 0);

    return {
      ok: true,
      message: 'Resumen documental de invoices obtenido con éxito.',
      data: {
        totals: {
          totalInvoices,
          draftInvoices: Number(totals?.draftInvoices ?? 0),
          issuedInvoices,
          paidInvoices,
          cancelledInvoices: Number(totals?.cancelledInvoices ?? 0),
          sentDocuments: Number(totals?.sentDocuments ?? 0),
          auditedInvoices: Number(totals?.auditedInvoices ?? 0),
          pendingAuditInvoices: Number(totals?.pendingAuditInvoices ?? 0),
          linkedOrdersInvoices: Number(totals?.linkedOrdersInvoices ?? 0),
          linkedPaymentsInvoices: Number(totals?.linkedPaymentsInvoices ?? 0),
          overdueInvoices: Number(totals?.overdueInvoices ?? 0),
          collectibleInvoices: Number(totals?.collectibleInvoices ?? 0),
          documentClosureReadyInvoices: Number(totals?.documentClosureReadyInvoices ?? 0),
          issuanceRatePercent: totalInvoices > 0 ? Math.round(((issuedInvoices + paidInvoices) / totalInvoices) * 100) : 0,
        },
        latest: latest as InvoiceLifecycleRow[],
      },
      count: Array.isArray(latest) ? latest.length : 0,
    };
  }

  private resolveDataSource(): DataSource | null {
    if (this.dataSource?.isInitialized) {
      return this.dataSource;
    }

    return null;
  }
}
# Invoice Microservice — Documentación Completa

> **Versión**: 0.0.1
> **Puerto**: 3003
> **Base URL**: `http://localhost:3003/api`
> **Swagger UI**: `http://localhost:3003/api-docs` (user: `admin`, pass: `admin123`)

---

## Tabla de Contenidos

1. [Historia de Usuario](#1-historia-de-usuario)
2. [Modelo DSL](#2-modelo-dsl)
3. [Arquitectura](#3-arquitectura)
4. [Módulos del Microservicio](#4-módulos-del-microservicio)
5. [Eventos Publicados](#5-eventos-publicados)
6. [Eventos Consumidos](#6-eventos-consumidos)
7. [API REST — Guía Completa Swagger](#7-api-rest--guía-completa-swagger)
8. [Guía para Desarrolladores](#8-guía-para-desarrolladores)
9. [Test E2E con curl](#9-test-e2e-con-curl)
10. [Análisis de Sagas y Eventos (E2E)](#10-análisis-de-sagas-y-eventos-e2e)

---

## 1. Historia de Usuario

### Bounded Context: Invoice

El microservicio **invoice** es dueño del ciclo de vida de las facturas (emisión, numeración,
estados, ajustes y cancelaciones) y sus líneas. Consume eventos de `orders-service` y
`payment-service` para construir la factura proyectada y publica eventos `invoice-*` para
downstream (contabilidad, reporting, notificaciones).

### Historias de Usuario Implementadas

| ID | Título | Módulo(s) |
|----|--------|-----------|
| UH-1 | Emisión de factura con numeración y estados | invoice |
| UH-2 | Consulta de facturas por cliente/periodo | invoice |
| UH-3 | Cancelación y ajustes de factura | invoice |

---

## 2. Modelo DSL

No hay DSL declarado todavía; el servicio se rige por el esquema TypeORM de la entidad `Invoice`.
Al generar el DSL debe cumplir `models/domain-model.v2.xsd`.

---

## 3. Arquitectura

Mismos patrones que el ecosistema: **CQRS + Event Sourcing + Kafka + Hexagonal + DDD**. Ver
[security-service/src/docs/README.md](../../../security-service/src/docs/README.md) secciones 3.1–3.3.

---

## 4. Módulos del Microservicio

### 4.1. Invoice
- **Entidad**: `Invoice` — invoiceNumber, issueDate, customerId, total, status, …
- **Estados**: `DRAFT`, `ISSUED`, `PAID`, `CANCELLED`, `REFUNDED`
- **CRUD**: create/update/delete + queries estándar

---

## 5. Eventos Publicados

| Módulo | Evento | Tópico Kafka | Versión |
|--------|--------|--------------|---------|
| invoice | `InvoiceCreatedEvent` | `invoice-created` | 1.0.0 |
| invoice | `InvoiceUpdatedEvent` | `invoice-updated` | 1.0.0 |
| invoice | `InvoiceDeletedEvent` | `invoice-deleted` | 1.0.0 |

---

## 6. Eventos Consumidos

| Módulo | Evento Consumido | Origen | Acción |
|--------|-----------------|--------|--------|
| invoice | `OrderConfirmedEvent` | orders-service | Generar borrador de factura |
| invoice | `PaymentCompletedEvent` | payment-service | Marcar `PAID` |
| invoice | `PaymentFailedEvent` | payment-service | Dejar en `ISSUED` y notificar |

---

## 7. API REST — Guía Completa Swagger

Patrones Command/Query CRUD estándar. Ver
[security-service/src/docs/README.md](../../../security-service/src/docs/README.md) secciones 7.1–7.2.

### Prefijos de rutas

| Módulo | Command | Query |
|--------|---------|-------|
| invoice | `/api/invoices/command` | `/api/invoices/query` |

### 7.5. Autenticación

- Stub `Authorization: Bearer valid-token`
- Swagger: `admin:admin123`

---

## 8. Guía para Desarrolladores

Ver [security-service/src/docs/README.md](../../../security-service/src/docs/README.md) sección 8.

---

## 9. Test E2E con curl

```bash
cd invoice-service && env LOG_API_AUTH_TOKEN=valid-token node dist/main.js
bash invoice-service/src/docs/e2e-test.sh
```

### Requisitos previos

1. Invoice-service corriendo en `http://localhost:3003`
2. PostgreSQL accesible (`invoice-service` DB)
3. `curl` y `jq` instalados

---

## 10. Análisis de Sagas y Eventos (E2E)

### Sagas CRUD

| Módulo | Saga Class | Handlers |
|--------|-----------|----------|
| invoice | `InvoiceCrudSaga` | 3 (Created, Updated, Deleted) |

### Sagas cross-context

| Saga | Evento fuente (Kafka) | Acción |
|------|----------------------|--------|
| `InvoiceFromOrderSaga` | `OrderConfirmedEvent` | Crear borrador de factura |
| `InvoicePaidSaga` | `PaymentCompletedEvent` | Marcar `PAID` |

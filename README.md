# INVOICE Microservice

**Fecha de creación**: 2025-03-31
**Última actualización**: 2025-03-31 12:49:57

**Autor**: Ing. Persy Morell Guerra e Ing. Dailyn García Dominguez (SoftwarEnTalla CEO)

## Estructura del microservicio

```
src/
├── modules/
│   └── invoice/
│       ├── commands/
│       ├── events/
│       ├── queries/
│       ├── aggregates/
│       ├── repositories/
│       ├── dtos/
│       ├── controllers/
│       ├── services/
│       └── invoice.module.ts
├── shared/
│   ├── event-store/
│   └── messaging/
├── Dockerfile
├── docker-compose.yml
└── package.json
```

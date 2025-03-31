import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { CreateInvoiceDto } from "../dtos/createinvoice.dto";
import { UpdateInvoiceDto } from "../dtos/updateinvoice.dto";
import { createUnionType } from "@nestjs/graphql";

@ValidatorConstraint({ name: "isCreateOrUpdateInvoiceDtoType", async: false })
export class IsInvoiceTypeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    // Verifica si el valor es un objeto y tiene la estructura esperada
    return (
      value instanceof CreateInvoiceDto || value instanceof UpdateInvoiceDto
    );
  }

  defaultMessage() {
    return "El valor debe ser un objeto de tipo CreateInvoiceDto o UpdateInvoiceDto";
  }
}

export function isCreateOrUpdateInvoiceDtoType(
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsInvoiceTypeConstraint,
    });
  };
}

// Crear un tipo de unión para GraphQL
export const InvoiceUnion = createUnionType({
  name: 'InvoiceUnion',
  types: () => [CreateInvoiceDto, UpdateInvoiceDto] as const,
});


import { ObjectType, Field } from "@nestjs/graphql";
import { GQResponseBase } from "src/common/types/common.types";
import { Invoice } from "../entities/invoice.entity";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType({ description: "Respuesta de invoice" })
export class InvoiceResponse<T extends Invoice> extends GQResponseBase {
  @ApiProperty({ type: Invoice,nullable:false,description:"Datos de respuesta de Invoice" })
  @Field(() => Invoice, { description: "Instancia de Invoice", nullable: true })
  data?: T;
}

@ObjectType({ description: "Respuesta de invoices" })
export class InvoicesResponse<T extends Invoice> extends GQResponseBase {
  @ApiProperty({ type: [Invoice],nullable:false,description:"Listado de Invoice",default:[] })
  @Field(() => [Invoice], { description: "Listado de Invoice", nullable: false,defaultValue:[] })
  data: T[] = [];

  @ApiProperty({ type: Number,nullable:false,description:"Cantidad de Invoice",default:0 })
  @Field(() => Number, { description: "Cantidad de Invoice", nullable: false,defaultValue:0 })
  count: number = 0;
}





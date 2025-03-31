import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsDate, IsOptional,IsObject, ValidateNested } from "class-validator";
import { InputType, Field } from '@nestjs/graphql';  
import { UpdateInvoiceDto } from './updateinvoice.dto';
import { InvoiceUnion, isCreateOrUpdateInvoiceDtoType } from "../decorators/invoice.decorators";

@InputType()
export class UpdateInvoiceDto {

  // Propiedades específicas de la clase UpdateInvoiceDto en cuestión
  
   
  @ApiProperty({
    description: "Identificador de instancia a actualizar",
    example:"Se proporciona un identificador de UpdateInvoice a actualizar",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String,{ nullable: false })
  id: string='';

  @ApiProperty({
    description: "Nombre de instancia UpdateInvoice",
    example: "Nombre de instancia UpdateInvoice",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String,{ nullable: false })
  name: string = "";

  // Propiedades predeterminadas de la clase UpdateInvoiceDto según especificación del sistema

  @ApiProperty({
    description:"Fecha de creación de la instancia (UpdateInvoice).",
    example: "Fecha de creación de la instancia (UpdateInvoice).",
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date,{ nullable: false })
  creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    description:"Fecha de actualización de la instancia (UpdateInvoice).",
    example: "Fecha de actualización de la instancia (UpdateInvoice).",
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date,{ nullable: false })
  modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    description:"Usuario que realiza la creación de la instancia (UpdateInvoice).",
    example: "Usuario que realiza la creación de la instancia (UpdateInvoice).",
  })
  @IsString()
  @IsOptional()
  @Field(() => String,{ nullable: true })
  createdBy?: string; // Usuario que crea el objeto

  @ApiProperty({
    description:"Estado de activación de la instancia (UpdateInvoice).",
    example: "Estado de activación de la instancia (UpdateInvoice).",
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean,{ nullable: false })
  isActive: boolean = false; // Por defecto, el objeto no está activo

  // Constructor 
  constructor(partial: Partial<UpdateInvoiceDto>) {
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<UpdateInvoiceDto>): UpdateInvoiceDto {
    const instance = new UpdateInvoiceDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}

//Clase dto base




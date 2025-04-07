<<<<<<< HEAD
<<<<<<< HEAD
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsDate, IsOptional,IsObject, ValidateNested } from "class-validator";
import { InputType, Field } from '@nestjs/graphql';  
import { UpdateInvoiceDto } from './updateinvoice.dto';
import { InvoiceUnion, isCreateOrUpdateInvoiceDtoType } from "../decorators/invoice.decorators";
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsDate, IsOptional,IsObject, ValidateNested } from 'class-validator';
import { InputType, Field, ObjectType} from '@nestjs/graphql';  
import { CreateInvoiceDto } from './createinvoice.dto';
import { isCreateOrUpdateInvoiceDtoType } from '../decorators/invoice.decorators';

<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)

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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
    type: String,
    description: "Nombre de instancia CreateInvoice",
    example: "Nombre de instancia CreateInvoice",
    nullable: false
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  name: string = '';

  // Propiedades predeterminadas de la clase CreateInvoiceDto según especificación del sistema

  @ApiProperty({
    type: Date,
    description: "Fecha de creación de la instancia (CreateInvoice).",
    example: "Fecha de creación de la instancia (CreateInvoice).",
    nullable: false
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: Date,
    description: "Fecha de actualización de la instancia (CreateInvoice).",
    example: "Fecha de actualización de la instancia (CreateInvoice).",
    nullable: false
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: String,
    description:
      "Usuario que realiza la creación de la instancia (CreateInvoice).",
    example: "Usuario que realiza la creación de la instancia (CreateInvoice).",
    nullable: true
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdBy?: string; // Usuario que crea el objeto

  @ApiProperty({
    type: Boolean,
    description: "Estado de activación de la instancia (CreateInvoice).",
    example: "Estado de activación de la instancia (CreateInvoice).",
    nullable: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { nullable: false })
  isActive: boolean = false; // Por defecto, el objeto no está activo

  // Constructor
  constructor(partial: Partial<CreateInvoiceDto>) {
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
<<<<<<< HEAD
<<<<<<< HEAD
  static build(data: Partial<UpdateInvoiceDto>): UpdateInvoiceDto {
    const instance = new UpdateInvoiceDto(data);
=======
  static build(data: Partial<CreateInvoiceDto>): CreateInvoiceDto {
    const instance = new CreateInvoiceDto(data);
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
  static build(data: Partial<CreateInvoiceDto>): CreateInvoiceDto {
    const instance = new CreateInvoiceDto(data);
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
<<<<<<< HEAD
<<<<<<< HEAD
}

//Clase dto base
=======

}

>>>>>>> e1c3064 (Se refactoriza invoice)
=======

}

>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)




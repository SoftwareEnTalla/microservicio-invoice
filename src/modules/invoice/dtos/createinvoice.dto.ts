import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsDate, IsOptional,IsObject, ValidateNested } from "class-validator";
import { InputType, Field } from '@nestjs/graphql';  
import { UpdateInvoiceDto } from './updateinvoice.dto';
import { InvoiceUnion, isCreateOrUpdateInvoiceDtoType } from "../decorators/invoice.decorators";

@InputType()
export class CreateInvoiceDto {

  // Propiedades específicas de la clase CreateInvoiceDto en cuestión
  
   
  @ApiProperty({
    description: "Identificador de instancia a crear",
    example: "Se proporciona un identificador de CreateInvoice a crear \(opcional\) ",
  })
  @IsString()
  @IsOptional()
  @Field(() => String,{ nullable: true })
  id?: string;

  @ApiProperty({
    description: "Nombre de instancia CreateInvoice",
    example: "Nombre de instancia CreateInvoice",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String,{ nullable: false })
  name: string = "";

  // Propiedades predeterminadas de la clase CreateInvoiceDto según especificación del sistema

  @ApiProperty({
    description:"Fecha de creación de la instancia (CreateInvoice).",
    example: "Fecha de creación de la instancia (CreateInvoice).",
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date,{ nullable: false })
  creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    description:"Fecha de actualización de la instancia (CreateInvoice).",
    example: "Fecha de actualización de la instancia (CreateInvoice).",
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date,{ nullable: false })
  modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    description:"Usuario que realiza la creación de la instancia (CreateInvoice).",
    example: "Usuario que realiza la creación de la instancia (CreateInvoice).",
  })
  @IsString()
  @IsOptional()
  @Field(() => String,{ nullable: true })
  createdBy?: string; // Usuario que crea el objeto

  @ApiProperty({
    description:"Estado de activación de la instancia (CreateInvoice).",
    example: "Estado de activación de la instancia (CreateInvoice).",
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean,{ nullable: false })
  isActive: boolean = false; // Por defecto, el objeto no está activo

  // Constructor 
  constructor(partial: Partial<CreateInvoiceDto>) {
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<CreateInvoiceDto>): CreateInvoiceDto {
    const instance = new CreateInvoiceDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}

//Clase dto base

        

        @InputType()
        export class InvoiceDto {
          // Propiedades específicas de la clase InvoiceDto en cuestión

          @IsString()
          @IsOptional()
          @Field(() => String,{ nullable: true })
          id?: string;

          @IsString()
          @IsNotEmpty()
          @Field(() => String,{ nullable: false })
          name: string = '';

          // Propiedades predeterminadas de la clase InvoiceDto según especificación del sistema

          @IsDate()
          @IsNotEmpty()
          @Field(() => Date,{ nullable: false })
          creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

          @IsDate()
          @IsNotEmpty()
          @Field(() => Date,{ nullable: false })
          modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

          @IsString()
          @IsOptional()
          @Field(() => String,{ nullable: true })
          createdBy?: string; // Usuario que crea el objeto

          @IsBoolean()
          @IsNotEmpty()
          @Field(() => Boolean,{ nullable: false })
          isActive: boolean = false; // Por defecto, el objeto no está activo

          // Constructor
          constructor(partial: Partial<InvoiceDto>) {
            Object.assign(this, partial);
          }

          // Método estático para construir la instancia
          static build(data: Partial<InvoiceDto>): InvoiceDto {
            const instance = new InvoiceDto(data);
            instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
            instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
            return instance;
          }
        }

        //Create or Update Dto

        @InputType()
        export class CreateOrUpdateInvoiceDto {
          
          @ApiProperty({
            description: 'Identificador de la instancia CreateInvoice',
            example: 'Nombre de instancia CreateInvoice',
          })
          @IsString()
          @IsOptional()
          @Field(() => String,{ nullable: true })
          id?: string; // Si tiene ID, es una actualización


          @ApiProperty({
            description: 'Nombre de instancia CreateInvoice',
            example: 'Nombre de instancia CreateInvoice',
          })
          @IsOptional()
          @IsObject()
          @ValidateNested() // Asegúrate de validar los objetos anidados
          @isCreateOrUpdateInvoiceDtoType({ message: 'input debe ser un objeto de tipo CreateInvoiceDto o UpdateInvoiceDto'}) // Usar class-transformer para la transformación de tipos
          @Field(() => CreateInvoiceDto, { nullable: true }) // Asegúrate de que el campo sea nullable si es opcional
          input?: CreateInvoiceDto | UpdateInvoiceDto;
        }
        



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
import { UpdateInvoiceDto } from './updateinvoice.dto';
import { isCreateOrUpdateInvoiceDtoType } from '../decorators/invoice.decorators';

<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)

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
<<<<<<< HEAD
<<<<<<< HEAD
    description: "Nombre de instancia CreateInvoice",
    example: "Nombre de instancia CreateInvoice",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String,{ nullable: false })
  name: string = "";
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
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)

  // Propiedades predeterminadas de la clase CreateInvoiceDto según especificación del sistema

  @ApiProperty({
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
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
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
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
<<<<<<< HEAD
<<<<<<< HEAD
}

//Clase dto base

        

=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)

}


        
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
        @InputType()
        export class InvoiceDto {
          // Propiedades específicas de la clase InvoiceDto en cuestión

<<<<<<< HEAD
<<<<<<< HEAD
          @IsString()
          @IsOptional()
          @Field(() => String,{ nullable: true })
          id?: string;

          @IsString()
          @IsNotEmpty()
          @Field(() => String,{ nullable: false })
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
          @ApiProperty({ type: String ,nullable: true, description: 'Identificador único de la instancia' })
          @IsString()
          @IsOptional()
          @Field(() => String, { nullable: true })
          id?: string;

          @ApiProperty({ type: String ,nullable: false, description: 'Nombre de la instancia' })
          @IsString()
          @IsNotEmpty()
          @Field(() => String, { nullable: false })
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
          name: string = '';

          // Propiedades predeterminadas de la clase InvoiceDto según especificación del sistema

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
          @ApiProperty({ type: Date ,nullable: false, description: 'Fecha de creaciónde la instancia' })
          @IsDate()
          @IsNotEmpty()
          @Field(() => Date, { nullable: false })
          creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

          @ApiProperty({ type: Date ,nullable: false, description: 'Fecha de modificación de la instancia' })
          @IsDate()
          @IsNotEmpty()
          @Field(() => Date, { nullable: false })
          modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

          @ApiProperty({ type: String ,nullable: true, description: 'Creador de la instancia' })
          @IsString()
          @IsOptional()
          @Field(() => String, { nullable: true })
          createdBy?: string; // Usuario que crea el objeto

          @ApiProperty({ type: Boolean ,nullable: false, description: 'Describe si la instancia está activa o no' })
          @IsBoolean()
          @IsNotEmpty()
          @Field(() => Boolean, { nullable: false })
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

        @ObjectType()
        export class InvoiceOutPutDto {
          // Propiedades específicas de la clase InvoiceDto en cuestión

          @ApiProperty({ type: String ,nullable: true, description: 'Identificador único de la instancia' })
          @IsString()
          @IsOptional()
          @Field(() => String, { nullable: true })
          id?: string;

          @ApiProperty({ type: String ,nullable: false, description: 'Nombre de la instancia' })
          @IsString()
          @IsNotEmpty()
          @Field(() => String, { nullable: false })
          name: string = '';

          // Propiedades predeterminadas de la clase InvoiceDto según especificación del sistema
          @ApiProperty({ type: Date ,nullable: false, description: 'Fecha de creaciónde la instancia' })
          @IsDate()
          @IsNotEmpty()
          @Field(() => Date, { nullable: false })
          creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

          @ApiProperty({ type: Date ,nullable: false, description: 'Fecha de modificación de la instancia' })
          @IsDate()
          @IsNotEmpty()
          @Field(() => Date, { nullable: false })
          modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

          @ApiProperty({ type: String ,nullable: true, description: 'Creador de la instancia' })
          @IsString()
          @IsOptional()
          @Field(() => String, { nullable: true })
          createdBy?: string; // Usuario que crea el objeto

          @ApiProperty({ type: Boolean ,nullable: false, description: 'Describe si la instancia está activa o no' })
          @IsBoolean()
          @IsNotEmpty()
          @Field(() => Boolean, { nullable: false })
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
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
<<<<<<< HEAD
<<<<<<< HEAD
          
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
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
          @ApiProperty({
            type: String,
            description: "Identificador de la instancia CreateInvoice",
            example: "Nombre de instancia CreateInvoice",
            nullable: true,
          })
          @IsString()
          @IsOptional()
          @Field(() => String, { nullable: true })
          id?: string; // Si tiene ID, es una actualización

          @ApiProperty({
            type: ()=>CreateInvoiceDto || UpdateInvoiceDto,
            description: "Nombre de instancia CreateInvoice",
            example: "Nombre de instancia CreateInvoice",
            nullable: true
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
          })
          @IsOptional()
          @IsObject()
          @ValidateNested() // Asegúrate de validar los objetos anidados
<<<<<<< HEAD
<<<<<<< HEAD
          @isCreateOrUpdateInvoiceDtoType({ message: 'input debe ser un objeto de tipo CreateInvoiceDto o UpdateInvoiceDto'}) // Usar class-transformer para la transformación de tipos
          @Field(() => CreateInvoiceDto, { nullable: true }) // Asegúrate de que el campo sea nullable si es opcional
          input?: CreateInvoiceDto | UpdateInvoiceDto;
        }
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
          @isCreateOrUpdateInvoiceDtoType({
            message:
              "input debe ser un objeto de tipo CreateInvoiceDto o UpdateInvoiceDto",
          }) // Usar class-transformer para la transformación de tipos
          @Field(() => CreateInvoiceDto, { nullable: true }) // Asegúrate de que el campo sea nullable si es opcional
          input?: CreateInvoiceDto | UpdateInvoiceDto;
        }

        @InputType()
        export class InvoiceValueInput {
          @ApiProperty({ type: String ,nullable: false, description: 'Campo de filtro' })
          @Field({ nullable: false })
          fieldName: string = 'id';

          @ApiProperty({ type: InvoiceDto ,nullable: false, description: 'Valor del filtro' })
          @Field(() => InvoiceDto, { nullable: false })
          fieldValue: any; // Permite cualquier tipo
        }

<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
        



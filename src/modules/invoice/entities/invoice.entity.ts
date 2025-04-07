import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CreateInvoiceDto } from '../dtos/createinvoice.dto';
import { UpdateInvoiceDto } from '../dtos/updateinvoice.dto';
import { DeleteInvoiceDto } from '../dtos/deleteinvoice.dto';
import { IsNotEmpty, IsString, validate } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('Invoice')
export class Invoice extends BaseEntity {

  // Propiedades de Invoice
  @ApiProperty({
      type: String,
      nullable: false,
      description: "Nombre de la instancia de Invoice",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Nombre de la instancia de Invoice", nullable: false })
  private name: string = "";

  // Constructor de Invoice
  constructor() {
    super();
  }
  
  // Getters y Setters

  get getName(): string {
    return this.name;
  }

  set setName(value: string) {
    this.name = value;
  }

  //Métodos o funciones de Invoice

  static fromDto(dto:CreateInvoiceDto|UpdateInvoiceDto|DeleteInvoiceDto):Invoice{
       return plainToClass(Invoice, dto);
  }

  //Implementación de Métodos abstractos de la clase padre
  async create(data: any): Promise<Invoice> {

    // Verifica si data es un array y toma el primer objeto si es necesario
    const singleData = Array.isArray(data) ? data[0] : data;  // Si es un array, tomamos el primer objeto

    // Convertir el objeto data a una instancia del DTO
    const invoiceDto = plainToInstance(CreateInvoiceDto, data as CreateInvoiceDto);

    // Validar el DTO
    const errors = await validate(invoiceDto);
    if (errors.length > 0) {
      throw new Error('Validation failed creating invoice!'); // Manejo de errores de validación
    }
    // Asignar la fecha de modificación
    invoiceDto.modificationDate = new Date();
    return {...this,...invoiceDto};
  }
  async update(data: any): Promise<Invoice>{

    // Verifica si data es un array y toma el primer objeto si es necesario
    const singleData = Array.isArray(data) ? data[0] : data;  // Si es un array, tomamos el primer objeto


    // Convertir el objeto data a una instancia del DTO
    const invoiceDto = plainToInstance(CreateInvoiceDto, singleData as CreateInvoiceDto);


    // Validar el DTO
    const errors = await validate(invoiceDto);
    if (errors.length > 0) {
      throw new Error('Validation failed creating invoice!'); // Manejo de errores de validación
    }
    // Asignar la fecha de modificación
    invoiceDto.modificationDate = new Date();
    return {...this,...invoiceDto};
  }
  async delete():  Promise<Invoice>{
    return {...this};
  }

}

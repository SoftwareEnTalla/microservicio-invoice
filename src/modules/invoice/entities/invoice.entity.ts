/*
 * Copyright (c) 2025 SoftwarEnTalla
 * Licencia: MIT
 * Contacto: softwarentalla@gmail.com
 * CEOs: 
 *       Persy Morell Guerra      Email: pmorellpersi@gmail.com  Phone : +53-5336-4654 Linkedin: https://www.linkedin.com/in/persy-morell-guerra-288943357/
 *       Dailyn García Domínguez  Email: dailyngd@gmail.com      Phone : +53-5432-0312 Linkedin: https://www.linkedin.com/in/dailyn-dominguez-3150799b/
 *
 * CTO: Persy Morell Guerra
 * COO: Dailyn García Domínguez and Persy Morell Guerra
 * CFO: Dailyn García Domínguez and Persy Morell Guerra
 *
 * Repositories: 
 *               https://github.com/SoftwareEnTalla 
 *
 *               https://github.com/apokaliptolesamale?tab=repositories
 *
 *
 * Social Networks:
 *
 *              https://x.com/SoftwarEnTalla
 *
 *              https://www.facebook.com/profile.php?id=61572625716568
 *
 *              https://www.instagram.com/softwarentalla/
 *              
 *
 *
 */


import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CreateInvoiceDto,UpdateInvoiceDto,DeleteInvoiceDto } from '../dtos/all-dto';
 
import { IsNotEmpty, IsString, validate } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('invoice')
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
  @Column({ type: 'varchar', length: 100, nullable: false,comment: 'Este es un campo para nombrar la instancia Invoice' })
  private name!: string ;

  @ApiProperty({
      type: String,
      nullable: false,
      description: "Descripción de la instancia de Invoice",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Descripción de la instancia de Invoice", nullable: false })
  @Column({ type: 'varchar', length: 255, nullable: false,default: "Sin descripción",comment: 'Este es un campo para describir la instancia Invoice' })
  private description!: string ;

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

   get getDescription(): string {
    return this.description;
  }

  set setDescription(value: string) {
    this.description = value;
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

import { IQuery } from '@nestjs/cqrs';

export abstract class BaseQuery implements IQuery {
<<<<<<< HEAD
<<<<<<< HEAD
  constructor(public readonly metadata?: Record<string, any>) {}
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
  //Constructor de BaseQuery
  constructor(public readonly metadata?: Record<string, any>) {
    //Aquí coloca implementación escencial no más de BaseQuery
  }
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
}

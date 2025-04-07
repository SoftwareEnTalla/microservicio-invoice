import { IQuery } from '@nestjs/cqrs';

export abstract class BaseQuery implements IQuery {
<<<<<<< HEAD
  constructor(public readonly metadata?: Record<string, any>) {}
=======
  //Constructor de BaseQuery
  constructor(public readonly metadata?: Record<string, any>) {
    //Aquí coloca implementación escencial no más de BaseQuery
  }
>>>>>>> e1c3064 (Se refactoriza invoice)
}

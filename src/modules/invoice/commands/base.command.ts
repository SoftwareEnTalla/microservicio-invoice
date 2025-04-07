import { ICommand } from '@nestjs/cqrs';

export abstract class BaseCommand implements ICommand {
<<<<<<< HEAD
<<<<<<< HEAD
  constructor(public readonly metadata?: Record<string, any>) {}
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
   //Constructor de BaseCommand
  constructor(public readonly metadata?: Record<string, any>) {
    //Aquí coloca implementación escencial no más de BaseCommand
  }
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
}

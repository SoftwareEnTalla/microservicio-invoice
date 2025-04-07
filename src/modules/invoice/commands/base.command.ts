import { ICommand } from '@nestjs/cqrs';

export abstract class BaseCommand implements ICommand {
<<<<<<< HEAD
  constructor(public readonly metadata?: Record<string, any>) {}
=======
   //Constructor de BaseCommand
  constructor(public readonly metadata?: Record<string, any>) {
    //Aquí coloca implementación escencial no más de BaseCommand
  }
>>>>>>> e1c3064 (Se refactoriza invoice)
}

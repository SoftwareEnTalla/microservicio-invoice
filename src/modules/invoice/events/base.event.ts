import { IEvent } from '@nestjs/cqrs';

export abstract class BaseEvent implements IEvent {
<<<<<<< HEAD
<<<<<<< HEAD
  constructor(
    public readonly aggregateId: string,
    public readonly timestamp: Date = new Date()
  ) {}
=======
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
  //Constructor de BaseEvent
  constructor(
    public readonly aggregateId: string,
    public readonly timestamp: Date = new Date()
  ) {
    //Aquí coloca implementación escencial no más de BaseEvent
  }
<<<<<<< HEAD
>>>>>>> e1c3064 (Se refactoriza invoice)
=======
>>>>>>> 7259216 (Mensaje descriptivo de tus cambios)
}
export abstract class BaseFailedEvent implements IEvent {
  constructor(public readonly error:Error,public readonly event:any) {}
}

import { IEvent } from '@nestjs/cqrs';

export abstract class BaseEvent implements IEvent {
<<<<<<< HEAD
  constructor(
    public readonly aggregateId: string,
    public readonly timestamp: Date = new Date()
  ) {}
=======
  //Constructor de BaseEvent
  constructor(
    public readonly aggregateId: string,
    public readonly timestamp: Date = new Date()
  ) {
    //Aquí coloca implementación escencial no más de BaseEvent
  }
>>>>>>> e1c3064 (Se refactoriza invoice)
}
export abstract class BaseFailedEvent implements IEvent {
  constructor(public readonly error:Error,public readonly event:any) {}
}

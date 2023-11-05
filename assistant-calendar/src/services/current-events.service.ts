import { Injectable } from '@angular/core';
import { Event } from 'src/app/Models/event.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentEventsService {

  eventList :Array<Event>

  constructor() {
    this.eventList = new Array<Event>();
   }

   
}

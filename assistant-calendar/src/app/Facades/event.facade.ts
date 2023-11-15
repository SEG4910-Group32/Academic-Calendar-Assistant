import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../Models/event.model';
import { EventRepository } from '../Repositories/event.repository';
import { EventFacadeInterface } from './interfaces/eventFacade.interface';

@Injectable({
  providedIn: 'root',
})
export class EventFacade implements EventFacadeInterface {

  
  constructor(private eventRepository: EventRepository) {}

  // Define methods to interact with the repository
  getEvents(): Observable<Event[]> {
    return this.eventRepository.getAllEvents();
  }

  getEventById(id: string): Observable<Event | undefined> {
    return this.eventRepository.getEventById(id);
  }

  createEvent(event: Event): Observable<Event> {
    return this.eventRepository.createEvent(event);
  }



  updateEvent(event: any): Observable<any> {

    return this.eventRepository.updateEvent(event);
  }

  deleteEvent(token:string ,id: string): Observable<void> {
    return this.eventRepository.deleteEvent(token, id);
  }
}

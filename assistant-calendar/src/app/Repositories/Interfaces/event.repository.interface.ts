import { Observable } from 'rxjs';
import { Event } from '../../Models/event.model';

export interface EventRepositoryInterface {
}
// event.repository.interface.ts

export interface EventRepositoryInterface {
  getAllEvents(): Observable<Event[]>;
  getEventById(eventId: string): Observable<Event>;
  createEvent(event: Event): Observable<any>;
  updateEvent(event: any,token:string, eventId: string): Observable<any>;
  deleteEvent(token:string,eventId: string): Observable<any>;
}
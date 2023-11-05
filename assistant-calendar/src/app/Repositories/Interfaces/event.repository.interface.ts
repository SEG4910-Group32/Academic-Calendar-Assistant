import { Observable } from 'rxjs';
import { Event } from '../../Models/event.model';

export interface EventRepositoryInterface {
}
// event.repository.interface.ts

export interface EventRepositoryInterface {
  getAllEvents(): Observable<Event[]>;
  getEventById(eventId: string): Observable<Event>;
  createEvent(event: Event): Observable<Event>;
  updateEvent(event: Event): Observable<Event>;
  deleteEvent(eventId: string): Observable<any>;
}
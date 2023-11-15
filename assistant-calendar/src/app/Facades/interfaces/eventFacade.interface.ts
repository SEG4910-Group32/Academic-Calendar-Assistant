import { Observable } from 'rxjs';
import { Event } from 'src/app/Models/event.model';

export interface EventFacadeInterface {
  // Define methods to interact with the repository
  getEvents(): Observable<Event[]>;
  
  getEventById(id: string): Observable<Event | undefined>;
  
  createEvent(event: Event): Observable<Event>;
  
  updateEvent(event: Event): Observable<Event>;
  
  deleteEvent(token:string, id: string): Observable<void>;
}

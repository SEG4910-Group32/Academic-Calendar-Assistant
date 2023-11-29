import { Observable } from 'rxjs';
import { Event } from 'src/app/Models/event.model';

export interface EventFacadeInterface {
  // Define methods to interact with the repository
  getEvents(): Observable<Event[]>;

  getEventById(id: string): Observable<Event | undefined>;

  createEvent(event: any): Observable<any>;

  updateEvent(eventId:string, token:string, event: any): Observable<any>;

  deleteEvent(token:string, id: string): Observable<void>;
}

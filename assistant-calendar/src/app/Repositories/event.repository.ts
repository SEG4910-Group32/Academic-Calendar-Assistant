// event.repository.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../Models/event.model';
import { EventRepositoryInterface } from './Interfaces/event.repository.interface';

@Injectable({
  providedIn: 'root',
})
export class EventRepository implements EventRepositoryInterface {
  
  
  private apiUrl = 'https://academic-calendar-backend.onrender.com/api/events';

  constructor(private http: HttpClient) {}
   

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/id/${eventId}`);
  }

  createEvent(event: Event): Observable<Event> {
    console.log(event);
    
    return this.http.post<Event>(this.apiUrl, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${event.schedule}`, event);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }
}
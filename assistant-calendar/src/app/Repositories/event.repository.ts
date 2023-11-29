// event.repository.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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

  getEventBySchedule(scheduleId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/schedule/${scheduleId}`);
  }

  /*returns event, updatedSchedule, message*/
  createEvent(event: Event): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }

  updateEvent(eventId:string, token:string, event: Event): Observable<any> {
    return this.http.patch<any>( `${this.apiUrl}/event/${eventId}/${token}`, event);
  }

  deleteEvent(token:string, eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/event/${eventId}/${token}`);
  }
}

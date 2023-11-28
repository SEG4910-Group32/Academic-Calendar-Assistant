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

  createEvent(event: Event): Observable<Event> {
    console.log("event is ", event);
    this.http.post<Event>(this.apiUrl, event).subscribe(
      response => {
        console.log('Response from server:', response);
        // You can perform additional actions with the response if needed
      },
      error => {
        console.error('Error:', error);
        // Handle the error if needed
      }
    );
   return this.http.post<Event>(this.apiUrl, event);
  }


  updateEvent(event: Event,token:string, eventId: string ): Observable<any> {
    return this.http.patch<Event>(`${this.apiUrl}/event/${eventId}/${token}`, event);
  }

  deleteEvent(token:string, eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/event/${eventId}/${token}`);
  }
}

// schedule.repository.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../Models/schedule.model';
import {ScheduleRepositoryInterface} from "./Interfaces/schedule.repository.interface";

@Injectable({
  providedIn: 'root',
})
export class ScheduleRepository implements ScheduleRepositoryInterface {
  // check with whoever is working on backend for apiURL
  private apiUrl = 'https://academic-calendar-backend.onrender.com/api/schedules';

  constructor(private http: HttpClient) {}

  getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  getScheduleById(scheduleId: string) {
    return this.http.post<any>(`${this.apiUrl}/id/${scheduleId}`, scheduleId);
  }


  getScheduleByName(scheduleName: string): Observable<Schedule>{
    return this.http.post<Schedule>(`${this.apiUrl}/name/${scheduleName}`, scheduleName);
  }


  createSchedule(schedule: Schedule): Observable<any> {

    return this.http.post<Schedule>(this.apiUrl, schedule);
  }
  
  createEvents(body: { id: string | undefined; events: any[]; }) {
    return this.http.patch<any>(this.apiUrl+'/createEvents', body);
  }

  updateSchedule(schedule: Schedule, scheduleId: string): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${scheduleId}`, schedule);
  }

  deleteSchedule(token:string, scheduleId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl, {headers: {
      'Content-Type': 'application/json',
    },
    body: {
      id: scheduleId,
      token: token,
    }});
  }

  getOwnedSchedules(tokenId: string):Observable<any>{
    return this.http.post(this.apiUrl+'/user/owns', { token: tokenId });
  }
  
  getSubscribedSchedules(tokenId: string):Observable<any>{
    return this.http.post(this.apiUrl+'/user/subscribed', { token: tokenId });
  }

}

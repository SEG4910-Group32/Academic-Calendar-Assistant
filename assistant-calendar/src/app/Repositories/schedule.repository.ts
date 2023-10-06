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

  getScheduleById(scheduleId: string): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${scheduleId}`);
  }

  createSchedule(schedule: Schedule):any{
    this.http.post<Schedule>(this.apiUrl +"/create", schedule).subscribe(
      resp => {
        console.log("We're in the resp");
        return new Schedule(resp);
      },
      err => {
        console.log("We're in err");
        console.log(err.error);
        if (err.status === 422) {
          console.log(err.error);
          return err.error;
        }
        else {
          
          return err.error;
        }
      }
    )
    // return this.http.post<Schedule>(this.apiUrl, schedule);
  }

  updateSchedule(schedule: Schedule, scheduleId: string): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${scheduleId}`, schedule);
  }

  deleteSchedule(scheduleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${scheduleId}`);
  }
}

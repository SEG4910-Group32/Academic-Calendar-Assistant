// user.repository.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import { UserRepositoryInterface } from './Interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  
  private apiUrl = 'https://academic-calendar-backend.onrender.com/api/users';


  constructor(private http: HttpClient) {}
   
  
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User, token:string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/user/${token}`, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${userId}`);
  }
  
   //Method to add a schedule to Users Schedules
   addSchedule(scheduleId:string, token:string, password:string ): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/user/${token}/schedule/${scheduleId}/add`, {token:token, scheduleId: scheduleId, password: password}
    // /user/:token/schedule/:scheduleid/remove
    );
  }
  
  removeSchedule(id: string, token:string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/schedule/${id}/remove`, {token:token}
    
    );
  }

}

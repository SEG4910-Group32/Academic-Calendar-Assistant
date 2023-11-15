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
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
  
  removeSchedule(id: string, token:string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/schedule/${id}/remove`, {token:token}
    
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  private apiUrl = 'https://academic-calendar-backend.onrender.com/api/users';

  constructor(private http: HttpClient) {}

 // Method to log in a user
  login(user: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, user);
  }
 // Method to create a new user
 createUser(newUser: any): Observable<User> {
  console.log('Request Payload:', newUser);
    return this.http.post<User>(this.apiUrl, newUser);
  }


  

  // Method to update a user's information
  updateUser(updatedUser: any, token:String): Observable<User> {
    const url = `${this.apiUrl}/user/${token}`;
    return this.http.patch<User>(url, updatedUser).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error updating user:', error);
      
      // Handle error
      return throwError(error);
    })
  );
    // return this.http.patch<User>(`${this.apiUrl}/user/${token}`, updatedUser);
  }

    //Method to get user information(userID is the user token)
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
  }

  // Method to delete a user(user id is the user token)
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${userId}`);
  }
  //Method to add a schedule to Users Schedules
  addSchedule(scheduleId:string, token:string, password:string ): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/user/${token}/schedule/${scheduleId}/add`, {token:token, scheduleId: scheduleId, password: password}
    // /user/:token/schedule/:scheduleid/remove
    );
  }

  //Method to unsubscribe from a schedule
  removeSchedule(id: string, token:string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/user/${token}/schedule/${id}/remove`, {token:token}
    // /user/:token/schedule/:scheduleid/remove
    );
  }

}
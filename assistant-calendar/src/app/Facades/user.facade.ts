import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user.model';
import {UserRepository} from "../Repositories/user.repository";
import {UserFacadeInterface} from "./interfaces/userFacade.interface";

@Injectable({
  providedIn: 'root'
})
export class UserFacade implements UserFacadeInterface{
  private apiUrl = 'https://academic-calendar-backend.onrender.com/api/users';

  constructor(private userRepository: UserRepository) {}


  getAllUsers(): Observable<User[]> {
    return this.userRepository.getAllUsers();
  }

  getUserById(token: string): Observable<User> {
    return this.userRepository.getUserById(token);
  }

  createUser(user: User): Observable<User> {
    return this.userRepository.createUser(user);
  }

  updateUser(user: User, token:string): Observable<User> {
    return this.userRepository.updateUser(user, token);
  }

  deleteUser(token:string): Observable<void> {
    return this.userRepository.deleteUser(token);
  }

  addSchedule(scheduleId:string, token:string, password:string ): Observable<void> {
    return this.userRepository.addSchedule(scheduleId, token, password);
  }

  removeSchedule(scheduleId:string, token:string): Observable<void> {
    return this.userRepository.removeSchedule(scheduleId, token);
  }
  /*need to test removeSchedule*/

  login(email: string, password: string): Observable<User> {
    return this.userRepository.login(email, password);
  }

  logout(token: string): Observable<User> {
    return this.userRepository.logout(token);
  }

}

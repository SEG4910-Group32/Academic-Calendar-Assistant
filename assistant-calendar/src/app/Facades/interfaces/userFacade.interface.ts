import {Observable} from "rxjs";
import {User} from "../../Models/user.model";


export interface UserFacadeInterface {
  getAllUsers(): Observable<User[]>;

  getUserById(token: string): Observable<User>;

  createUser(user: User): Observable<User>;

  updateUser(user: User, token: string): Observable<User>;

  deleteUser(token: string): Observable<void>;

  addSchedule(scheduleId: string, token: string, password: string): Observable<void>;

  removeSchedule(scheduleId: string, token: string): Observable<void>;

  login(email: string, password: string): Observable<User>;

  logout(token: string): Observable<User>;
}

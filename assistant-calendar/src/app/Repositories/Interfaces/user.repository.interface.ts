import { Observable } from 'rxjs';
import { User } from '../../Models/user.model';

export interface UserRepositoryInterface {
}
// user.repository.interface.ts

export interface UserRepositoryInterface {
  getAllUsers(): Observable<User[]>;
  getUserById(userId: string): Observable<User>;
  createUser(user: User): Observable<User>;
  updateUser(user: User): Observable<User>;
  deleteUser(userId: string): Observable<any>;
}
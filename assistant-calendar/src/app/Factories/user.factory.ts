import { User } from 'src/app/Models/user.model';

export class UserFactory {
  static createUser(userData: any): User {
    return new User(userData);
  }
}
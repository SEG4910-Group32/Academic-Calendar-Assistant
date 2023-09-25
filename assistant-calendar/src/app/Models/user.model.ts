export class User {
    
    userId: string;
    firstName!: string;
    lastName!: string;
    email!: string; 
    password!: string;

    constructor(userData: any) {
      this.userId = userData.eventId;
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      this.email = userData.email;
      this.password = userData.password;
    }
  }
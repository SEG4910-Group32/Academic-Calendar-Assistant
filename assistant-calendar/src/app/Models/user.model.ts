export class User {
    
    userId: string;
    username!: String
    firstName!: string;
    lastName!: string;
    type!: string
    email!: string; 
    password!: string;

    constructor(userData: any) {
      this.userId = userData.eventId;
      this.username = userData.username;
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      this.type = userData.type;
      this.email = userData.email;
      this.password = userData.password;
    }
  }
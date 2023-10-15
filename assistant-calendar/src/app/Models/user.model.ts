export class User {
    
    id: string;
    username!: String
    firstName!: string;
    lastName!: string;
    type!: string
    email!: string; 
    password!: string;
    schedules!: [string];
    owns!: [string];

    constructor(userData: any) {
      this.id = userData.id || '';
      this.username = userData.username|| '';
      this.firstName = userData.firstName|| '';
      this.lastName = userData.lastName|| '';
      this.type = userData.type|| '';
      this.email = userData.email|| '';
      this.password = userData.password|| '';
      this.schedules = userData.schedules|| [];
      this.owns = userData.owns|| [];
    }
  }
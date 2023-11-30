export class User {

    id?: string;
    username!: string;
    firstName!: string;
    lastName!: string;
    type!: string
    email!: string;
    password!: string;
    schedules?: [string];
    owns?: [string];

    constructor(userData: any) {
      this.id = userData.id || undefined;
      this.username = userData.username|| undefined;
      this.firstName = userData.firstName|| undefined;
      this.lastName = userData.lastName|| undefined;
      this.type = userData.type|| undefined;
      this.email = userData.email|| undefined;
      this.password = userData.password|| undefined;
      this.schedules = userData.schedules|| undefined;
      this.owns = userData.owns|| undefined;
    }
  }

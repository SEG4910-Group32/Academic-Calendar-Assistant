import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
declare let Email: any;

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor() { }

  private generateConfirmationCode(): string {
    let res = "";

    for (let i = 0; i < 6; i++) {
      let c = Math.floor(Math.random() * 89) + 33;
      res += String.fromCharCode(c);
    }

    return res;
  }

  sendConfirmationEmail(email: string): Observable<string> {
    let code = this.generateConfirmationCode();

    Email.send({
      SecureToken : "f7d81102-e7d3-4cef-996d-fbf500bda3f3",
      To : email,
      From : "seg4910team32test@gmail.com",
      Subject : "Confirmation Code",
      Body : code
    });

    return of(code);
  }

  sendAccountCreatedEmail(email: string): Observable<string> {
    Email.send({
      SecureToken : "f7d81102-e7d3-4cef-996d-fbf500bda3f3",
      To : email,
      From : "seg4910team32test@gmail.com",
      Subject : "Confirmation Code",
      Body : "Account Successfully Created"
    });

    return of("account created");
  }

  sendPasswordChangedEmail(email: string): Observable<string> {
    Email.send({
      SecureToken : "f7d81102-e7d3-4cef-996d-fbf500bda3f3",
      To : email,
      From : "seg4910team32test@gmail.com",
      Subject : "Confirmation Code",
      Body : "Password Successfully Changed"
    });

    return of("password changed");
  }

  // possibly email schedule in the future

  // possibly email notification when event created
}

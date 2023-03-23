import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
declare let Email: any;

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private fromEmail = "seg4910team32test@gmail.com";

  constructor() { }

  private generateConfirmationCode(): string {
    let res = "";

    for (let i = 0; i < 6; i++) {
      let c = Math.floor(Math.random() * 89) + 33;
      res += String.fromCharCode(c);
    }

    return res;
  }

  private generatePasswordChangedEmail(): string {
    return "";
  }

  private generateAccountCreatedEmail(): string {
    return "";
  }

  private generateEmailBody(emailType: string): any {
    switch(emailType) {
      case "changePassConfCode":
        return {
          subject: "Confirmation Code",
          body: this.generateConfirmationCode()
        }
      case "passConf":
        return {
          subject: "Password Successfully Changed",
          body: this.generatePasswordChangedEmail()
        }
      case "createdConf":
        return {
          subject: "Account Successfully Created",
          body: this.generateAccountCreatedEmail()
        }
    }

    return {};
  }

  sendEmail(email: string, emailType: string): Observable<string> {
    var emailContent = this.generateEmailBody(emailType);

    Email.send({
      SecureToken: "f7d81102-e7d3-4cef-996d-fbf500bda3f3",
      To: email,
      From: this.fromEmail,
      Subject: emailContent.subject,
      Body: emailContent.body
    });

    return of("");
  }

  // possibly email schedule in the future

  // possibly email notification when event created
}

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private redirected = new BehaviorSubject<string>("false");
  private localEmail = new BehaviorSubject<string>("");
  private loggedIn = new BehaviorSubject<boolean>(false);
  currRedirectedVal = this.redirected.asObservable();
  currLocalEmail = this.localEmail.asObservable();
  loggedInStatus = this.loggedIn.asObservable();

  constructor() { }

  /**
   * Updates redirected variable. This is to enable login popup when
   * a unlogged in user is redirected to the homepage
   * @param val string denoting if whether or not the user was redirected
   */
  updateRedirected(val: string) {
    this.redirected.next(val);
  }

  /**
   * Updates local email variable for "change password" form
   * @param val string denoting the email to update to
   */
  updateLocalEmail(val: string) {
    this.localEmail.next(val);
  }

  /**
   * Updates the logged in status to display user info in the nav-bar
   * @param val boolean denoting the new status
   */
  updateLoggedInStatus(val: boolean) {
    this.loggedIn.next(val);
  }

}

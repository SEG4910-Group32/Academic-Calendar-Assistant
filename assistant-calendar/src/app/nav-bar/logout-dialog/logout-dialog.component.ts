import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserFacade } from 'src/app/Facades/user.facade';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})

/**
 * We created the log out component which  will show on top of the page when user clicks on log out
 * before logging out, the user is asked if they are sure they want to sign out and from there they can click on yes or no
 * there is also a timer to check if the user hasn't been active for a specific time the app will ask the user if they want to 
 * sign out
 */

export class LogoutDialogComponent {

  showConfirmation: boolean = true;
  logoutSuccessful: boolean = false;
  logoutUnsuccessful: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    private userFacade: UserFacade,
  ) {}

  logout() {
    this.userFacade.logout(localStorage.getItem('currUser') as string).subscribe(
      (res: any) => {
        if (res.msg === "Token successfully invalidated") {
          this.logoutSuccessful = true;
          localStorage.removeItem('currUser'); //removes the user token from local storage
        }
        this.showConfirmation = false;
      },
      (err: any) => {
        console.error(err);
        this.logoutUnsuccessful = true;
        this.showConfirmation = false;
      }
    );
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}

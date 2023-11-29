import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserFacade } from 'src/app/Facades/user.facade';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
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
          localStorage.removeItem('currUser');
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

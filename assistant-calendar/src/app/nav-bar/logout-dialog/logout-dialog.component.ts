import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LogoutDialogComponent>
  ) {}

  logout() {
    this.dialogRef.close('logout');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}

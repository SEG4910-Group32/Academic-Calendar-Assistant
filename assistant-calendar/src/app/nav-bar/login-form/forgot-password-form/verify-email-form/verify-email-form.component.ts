import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-email-form',
  templateUrl: './verify-email-form.component.html',
  styleUrls: ['./verify-email-form.component.css',
              '../../../../form-styles.css']
})
export class VerifyEmailFormComponent {
  verificationCode = new FormControl('');

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VerifyEmailFormComponent>
  ) {}

  submit(): void {
    console.log(this.verificationCode);
    this.dialogRef.close('openNewPassForm');
  }
}

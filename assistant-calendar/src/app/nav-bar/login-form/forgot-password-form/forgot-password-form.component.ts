import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css',
              '../../../form-styles.css']
})
export class ForgotPasswordFormComponent {
  email = new FormControl('');

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ForgotPasswordFormComponent>
  ) {}

  submit(): void {
    console.log(this.email);
    this.dialogRef.close('openVerificationForm');
  }
}

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css',
              '../../../form-styles.css']
})
export class ForgotPasswordFormComponent {
  forgotPasswordForm = this.fb.group({
    email: ['']
  });

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ForgotPasswordFormComponent>
  ) {}

  getFormValues(): Object {
    return {
      email: this.forgotPasswordForm.controls.email.value
    }
  }

  submit(): void {
    console.log(this.getFormValues());
    this.openVerificationForm();
  }

  openVerificationForm(): void {
    this.dialogRef.close('openVerification');
  }
}

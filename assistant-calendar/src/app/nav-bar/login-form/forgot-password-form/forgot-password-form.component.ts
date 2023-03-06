import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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

  submit(): void {
    console.log(this.forgotPasswordForm.controls.email.value);
    this.dialogRef.close('openVerificationForm');
  }
}

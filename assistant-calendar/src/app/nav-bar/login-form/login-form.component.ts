import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css',
              '../../form-styles.css']
})

export class LoginFormComponent {
  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginFormComponent>
  ) {}
  
  getFormValues(): Object {
    return {
      email: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value
    }
  }

  submit(): void {
    console.log(this.getFormValues());
  }

  openSignUpForm(): void {
    this.dialogRef.close('openSignUp');
  }

  openForgotPasswordForm(): void {
    this.dialogRef.close('openForgotPass');
  }
}

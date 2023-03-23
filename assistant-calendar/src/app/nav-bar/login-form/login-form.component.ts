import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';

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

  login = async (user: Object) => {
    this.http.post("http://localhost:3000/user/login", user).subscribe(res => {
      console.log(res);
    }, err => {
      console.log("error");
    });
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public http: HttpClient
  ) {}

  getFormValues(): Object {
    return {
      email: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value
    }
  }

  submit(): void {
    this.login(this.getFormValues());
  }

  openSignUpForm(): void {
    this.dialogRef.close('openSignUp');
  }

  openForgotPasswordForm(): void {
    this.dialogRef.close('openForgotPass');
  }
}

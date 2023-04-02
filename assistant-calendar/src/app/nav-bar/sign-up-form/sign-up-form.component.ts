import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { mustContainValidator } from 'src/app/must-contain-validator';
import { EmailService } from 'src/app/email.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css',
    '../../form-styles.css']
})

export class SignUpFormComponent {

  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    password: ['', [Validators.required, Validators.minLength(8), 
                    Validators.maxLength(16), mustContainValidator()]]
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SignUpFormComponent>,
    private http: HttpClient,
    private email: EmailService,
    private _snackBar: MatSnackBar
  ) { }

  getFormValues(): Object {
    return {
      email: this.signUpForm.controls.email.value,
      firstName: this.signUpForm.controls.firstName.value,
      lastName: this.signUpForm.controls.lastName.value,
      password: this.signUpForm.controls.password.value
    }
  }

  submit() {
    console.log(this.getFormValues());
    console.log(this.signUpForm.controls);
    console.log(this.signUpForm.value);

    let valid = true;

    if (valid) {
      this.createUser(this.signUpForm.value);
    }
  }

  createUser = async (newUser: Object) => {
    this.http.post("http://localhost:3000/user/create",newUser).subscribe(res => {
      this._snackBar.open("User Created!", "", {
        duration: 1500
      });

      this.dialogRef.close();
    }, err => {
      if (err.status === 422) {
        console.log(err.error);

        this._snackBar.open(err.error.join('\n'));
      }
      else {
        this._snackBar.open("Unknown Error Occurred!", "", {
          duration: 1500
        });
      }
    });
  };

  openSignInForm(): void {
    this.dialogRef.close('openSignIn');
  }
}

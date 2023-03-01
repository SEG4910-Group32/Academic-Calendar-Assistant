import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css',
    '../../form-styles.css']
})

export class SignUpFormComponent {
  signUpForm = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    password: ['']
  });
  errors: any;
  serverErrorMessages: any;
  showSucessMessage!: boolean;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SignUpFormComponent>
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
    console.log(this.signUpForm.getRawValue());
    let valid = true

    if (valid) {
      this.createUser(this.signUpForm.getRawValue())
    }
  }

  createUser = async (newUser: Object) => {
    let results = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(
      resp => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.signUpForm.reset();
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else {
          this.serverErrorMessages = 'Unknown error occurred';
        }
      });
    console.log(results);


    return results

  }

  openSignInForm(): void {
    this.dialogRef.close('openSignIn');
  }
}

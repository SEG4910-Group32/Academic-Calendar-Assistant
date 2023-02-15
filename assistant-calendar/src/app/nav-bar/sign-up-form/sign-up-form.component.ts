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

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SignUpFormComponent>
  ) {}

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
  }

  openSignInForm(): void {
    this.dialogRef.close('openSignIn');
  }
}

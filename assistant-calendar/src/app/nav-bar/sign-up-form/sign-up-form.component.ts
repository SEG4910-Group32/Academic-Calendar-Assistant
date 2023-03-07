import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { mustContainValidator } from 'src/app/must-contain-validator';

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
    console.log(this.signUpForm.controls);
  }

  openSignInForm(): void {
    this.dialogRef.close('openSignIn');
  }
}

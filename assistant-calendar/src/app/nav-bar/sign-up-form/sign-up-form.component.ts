import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { mustContainValidator } from 'src/app/must-contain-validator';
import { UserFacade } from 'src/app/Facades/user.facade';
import { User } from 'src/app/Models/user.model';
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
    type: ['Student'],
    username: [''],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), mustContainValidator()]],
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SignUpFormComponent>,
    private _snackBar: MatSnackBar,
    private userFacade: UserFacade,
  ) {
    // Subscribe to changes in firstName and lastName fields
    this.signUpForm.get('firstName')!.valueChanges.subscribe(() => {
      this.updateUsername();
    });

    this.signUpForm.get('lastName')!.valueChanges.subscribe(() => {
      this.updateUsername();
    });
  }

  // Method to update the username based on firstName and lastName
  private updateUsername() {
    const firstName = this.signUpForm.get('firstName')!.value;
    const lastName = this.signUpForm.get('lastName')!.value;
    // Set the username to the concatenated value of firstName and lastName
    this.signUpForm.get('username')!.setValue(`${firstName} ${lastName}`);
  }

  getFormValues(): Object {
    console.log("this.signUpForm.controls.firstName.value +' ' + this.signUpForm.controls.lastName.value",this.signUpForm.controls.firstName.value +'_' + this.signUpForm.controls.lastName.value)
    return {
      email: this.signUpForm.controls.email.value,
      username: `${this.signUpForm.controls.firstName.value} ${this.signUpForm.controls.lastName.value}`,

      //username:  this.signUpForm.controls.firstName.value +' ' + this.signUpForm.controls.lastName.value,
      //firstName: this.signUpForm.controls.firstName.value,
      //lastName: this.signUpForm.controls.lastName.value,
      password: this.signUpForm.controls.password.value,
      type: "Student"

    }
  }

  submit() {
    console.log(this.getFormValues());
    console.log(this.signUpForm.controls);
    console.log(this.signUpForm.value);

    let valid = true;

    let createdUser = new User(this.signUpForm.value);

    if (valid) {
      this.createUser(createdUser);
    }
  }

  createUser = async (newUser: User) => {
    this.userFacade.createUser(newUser).subscribe(
      (res: any) => {
        console.log("result of sign up ",res)
        this._snackBar.open("User Created!", "", {
          duration: 1500
        });

        this.dialogRef.close();
      },
      (err: any) => {
        console.log(err.error);
        if (err.status === 422) {
          console.log(err.error);
          this._snackBar.open(err.error.join('\n'));
        } else {
          this._snackBar.open("Unknown Error Occurred!", "", {
            duration: 1500
          });
        }
      }
    );
  };


  openSignInForm(): void {
    this.dialogRef.close('openSignIn');
  }
}

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

/**
 * We created this component for signing up for an account
 * the component shows on top of the current page(like a dialog) and asks for an email, firstname, lastname and password
 * after all fields are filled in and the password requirements are met, the sign up button is enabled and the user can 
 * create an account
 */

export class SignUpFormComponent {

  signupError: boolean = false;
  errorMsg: string= "";

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

  //this method calls the create user method in the userfacade which sends and API call to the backend to create a new account
  createUser = async (newUser: User) => {
    this.userFacade.createUser(newUser).subscribe(
      (res: any) => {
        if(res.msg=="User successfully created"){
          this._snackBar.open(res.msg, "", {
            duration: 1500
          });
          console.log("result of sign up ",res);
          this.dialogRef.close();
        }
      },
      (err: any) => {
        console.log(err.error);
        if (err.status === 422) {
          console.log(err.error);
          this._snackBar.open(err.error.join('\n'));
        } else {
          this.signupError = true;
          this.errorMsg = err.error.error;
        }
      }
    );
  };


  openSignInForm(): void {
    this.dialogRef.close('openSignIn');
  }
}

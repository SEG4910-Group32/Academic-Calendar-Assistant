import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import {User} from "../Models/user.model";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserFacade } from '../Facades/user.facade';

@Component({
  selector: 'app-update-profile-page',
  templateUrl: './update-profile-page.component.html',
  styleUrls: ['./update-profile-page.component.css']
})
export class UpdateProfilePageComponent {

  updateProfileForm = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    password: [''],
    username: ['']
  });

  initialFormValues: { [key: string]: any } | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public http: HttpClient,
    private _snackBar: MatSnackBar,
    private userFacade: UserFacade
  ) { }

  private isFormChanged(): boolean {
    if (!this.initialFormValues) {
      return false; // No initial values to compare
    }

    const formValues = this.updateProfileForm.value;
    const initialValues = this.initialFormValues;

    return JSON.stringify(formValues) !== JSON.stringify(initialValues);
  }

  update = async (user: Object) => {
    if (!this.isFormChanged()) {
      // No changes to update
      return;
    }
    const updatedUser: { [key: string]: any } = {};
  const formValues = this.updateProfileForm.value as { [key: string]: any };

  Object.keys(formValues).forEach((key) => {
    if (this.initialFormValues && formValues[key] !== this.initialFormValues[key]) {
      if (key === 'password' && formValues[key] !== '') {
        updatedUser[key] = formValues[key];
      } else if (key !== 'password') {
        updatedUser[key] = formValues[key];
      }
    }
  });
   // const updatedUser = this.updateProfileForm.value;
    console.log("updated Userrrrrrrrrrrrr", updatedUser)
    this.userFacade.updateUser(new User(updatedUser), localStorage.getItem("currUser") as string).subscribe(res => {
      console.log("result is", res);
      this._snackBar.open("Changes Saved!", "", {
        duration: 1500
      });
    }, err => {
      console.log("error");
    });
  };

  delete = async (email: string) => {
    //this.http.delete("http://localhost:3000/api/user/delete/" + email)
    this.userFacade.deleteUser(localStorage.getItem("currUser") as string).subscribe(res => {
      console.log(res);
      this._snackBar.open("User Deleted!", "", {
        duration: 1500
      });
    }, err => {
      console.log("error");
    });
  };

  /**
   * Populates form with current user information in local storage
   */
  ngOnInit() {
    // gets the user info from the backend to show in the form
    this.getUserInfo().subscribe(
      (user) => {
        console.log("User update", user);
        if (user) {
              this.updateProfileForm.controls.email.setValue(user.email);
              this.updateProfileForm.controls.firstName.setValue(user.firstName);
              this.updateProfileForm.controls.lastName.setValue(user.lastName);
              this.updateProfileForm.controls.username.setValue(user.username as string);
              this.initialFormValues = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: null,
              };
            }

      },
      (error) => {
        console.error("Error fetching user information", error);
      }
    );
  }

  /**
   * Updates profile of logged in user and then displays update status message
   */
  submit() {
    this.update(this.updateProfileForm.value);
  }

  /**
   * Delete profile of user logged in
   * note: needs to be updated later
   */
  deleteFun() {
    let email = this.updateProfileForm.controls.email.value;

    if (email) {
      this.delete(email);
    }
  }

  getUserInfo(){
    return this.userFacade.getUserById(localStorage.getItem('currUser') as string)
  }

  /**
   * Redirects user back to homepage
   */
  backToHome() {
    this.router.navigate(['/home']);
  }
}

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    password: ['']
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  update = async (user: Object) => {
    this.http.patch("http://localhost:3000/api/user/update", user).subscribe(res => {
      console.log(res);
      this._snackBar.open("Changes Saved!", "", {
        duration: 1500
      });
    }, err => {
      console.log("error");
    });
  };

  delete = async (email: string) => {
    this.http.delete("http://localhost:3000/api/user/delete/" + email).subscribe(res => {
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
    let user = localStorage.getItem('currUser');

    if (user) {
      let userObject = JSON.parse(user);
      this.updateProfileForm.controls.email.setValue(userObject.email);
      this.updateProfileForm.controls.firstName.setValue(userObject.firstName);
      this.updateProfileForm.controls.lastName.setValue(userObject.lastName);
    }
  }

  /**
   * Updates profile of logged in user and then displays update status message
   */
  submit() {
    this.update(this.updateProfileForm.value);
  }

  /**
   * Delte profile of user logged in
   * note: needs to be updated later
   */
  deleteFun() {
    let email = this.updateProfileForm.controls.email.value;
    
    if (email) {
      this.delete(email);
    }
  }

  /**
   * Redirects user back to homepage
   */
  backToHome() {
    this.router.navigate(['/home']);
  }
}

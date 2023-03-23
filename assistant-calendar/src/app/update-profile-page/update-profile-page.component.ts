import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

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
    private fb: FormBuilder,
    public http: HttpClient
  ) { }

  update = async (user: Object) => {
    this.http.patch("http://localhost:3000/user/update", user).subscribe(res => {
      console.log(res);
    }, err => {
      console.log("error");
    });
  };

  delete = async (email: string) => {
    this.http.delete("http://localhost:3000/user/delete/" + email).subscribe(res => {
      console.log(res);
    }, err => {
      console.log("error");
    });
  };

  submit() {
    // console.log(this.updateProfileForm.value);
    this.update(this.updateProfileForm.value);
  }

  deleteFun() {
    let email = this.updateProfileForm.controls.email.value;
    
    if (email) {
      this.delete(email);
    }
  }
}

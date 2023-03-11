import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { mustContainValidator } from 'src/app/must-contain-validator';
import { EmailService } from 'src/app/email.service';

import { User } from '../../shared/user.model';

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
  errors: any;
  serverErrorMessages: any;
  showSucessMessage!: boolean;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SignUpFormComponent>,
    private http: HttpClient
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
    // this.email.sendAccountCreatedEmail("").subscribe(res => {
    //   console.log(res);
    // });
    
    let valid = true

    if (valid) {
      
      
      this.createUser(this.signUpForm.value)
    }
  }

  createUser = async (newUser: Object) => {

    this.http.post("http://localhost:3000/user/create",newUser).subscribe(
      resp => {
        this.showSucessMessage = true;
        this.serverErrorMessages = "";
        
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.signUpForm.reset();
      },
      err => {
        if (err.status === 422) {
          console.log(err.error);
          
          this.serverErrorMessages = err.error.join('\n');
        }
        else {
          this.serverErrorMessages = 'Unknown error occurred';
        }
      }
    )

    // let results = await fetch("http://localhost:3000/user/create", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   body: JSON.stringify(newUser)
    // }).then(
    //   resp => {
    //     if (resp.status === 422) {
    //       console.log(resp.error);
          
    //       this.serverErrorMessages = resp.error.join('<br/>');
    //     }
    //     else {
    //       this.serverErrorMessages = 'Unknown error occurred';
    //     }

    //     console.log(resp);
    //     this.showSucessMessage = true;
        
    //     setTimeout(() => this.showSucessMessage = false, 4000);
    //     this.signUpForm.reset();
    //   },
    //   err => {
    //     if (err.status === 422) {
    //       console.log(err.error);
          
    //       this.serverErrorMessages = err.error.join('<br/>');
    //     }
    //     else {
    //       this.serverErrorMessages = 'Unknown error occurred';
    //     }
    //   });
    // console.log(results);
  }

  openSignInForm(): void {
    this.dialogRef.close('openSignIn');
  }
}

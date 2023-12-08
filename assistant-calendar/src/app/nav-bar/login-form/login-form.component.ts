import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFacade } from 'src/app/Facades/user.facade';
import { User } from 'src/app/Models/user.model';

import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css',
  '../../form-styles.css']
})

/**
 * We created the login form for the sign in componet
 * the component shows on top of the current page that the user is currently on
 * The user can use their email and password to sign in
 */

export class LoginFormComponent {
  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loginError: boolean = false;
  redirect: any;
  redirectPath: string = "";

  login = async (user: User) => {

    this.userFacade.login(user.email, user.password).subscribe(
      (res: any) => {
        if(res.token){
          localStorage.setItem('currUser', res.token);
          this.data.updateLoggedInStatus(true);
          if (this.redirect === 'true') {
            this.router.navigate([this.redirectPath]);
          }
          this.dialogRef.close();
        }
        else{
          this.loginError = true;
        }
      }, (err: any) => {
        console.log(err.error);
      }
    );
  };

  /**
   * Clear local storage and check for route params
   */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.redirect = params['redirect'];
      this.redirectPath = params['path'];
    });

  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public http: HttpClient,
    private data: DataService,
    private userFacade: UserFacade
  ) {}

  /**
   * Retrieves data from form
   * @returns Object representing form values
   */
  getFormValues(): Object {
    return {
      email: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value
    }
  }

  /**
   * Attempts login http request
   */
  submit(): void {
    this.login(new User(this.getFormValues()));
  }

  /**
   * Closes Login dialog and opens Sign Up Dialog
   */
  openSignUpForm(): void {
    this.dialogRef.close('openSignUp');
  }

    /**
   * Closes Login dialog and opens Forgot Password Dialog
   */
  openForgotPasswordForm(): void {
    this.dialogRef.close('openForgotPass');
  }
}

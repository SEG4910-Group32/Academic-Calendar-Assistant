import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { ForgotPasswordFormComponent } from './login-form/forgot-password-form/forgot-password-form.component';
import { VerifyEmailFormComponent } from './login-form/forgot-password-form/verify-email-form/verify-email-form.component';
import { NewPasswordFormComponent } from './login-form/forgot-password-form/new-password-form/new-password-form.component';

import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    public dialog: MatDialog,
    private data: DataService,
    private router: Router
  ) {}

  username: string = "";

  ngOnInit() {
    this.data.currRedirectedVal.subscribe(val => {
      if (val === "true") {
        this.openSignInForm();
      }
    });

    // if the user is logged in, display the username in nav-bar
    this.data.loggedInStatus.subscribe(val => {
      let prompts = document.querySelector('.prompts');
      let loggedIn = document.querySelector('.logged-in');

      if (val) {
        let userInfo = localStorage.getItem('currUser');

        if (userInfo) {
          let obj = JSON.parse(userInfo);
          this.username = obj.firstName + " " + obj.lastName;
        }

        prompts?.classList.add('invisible');
        loggedIn?.classList.remove('invisible');
      }
      else {
        prompts?.classList.remove('invisible');
        loggedIn?.classList.add('invisible');
      }
    });

  }

  switchState(state: string): void {
    switch(state) {
      case 'openSignIn':
        this.openSignInForm();
        break;
      case 'openSignUp':
        this.openSignUpForm();
        break;
      case 'openForgotPass':
        this.openForgotPasswordForm();
        break;
      case 'openVerification':
        this.openVerificationForm();
        break;
      case 'openNewPass':
        this.openNewPasswordForm();
        break;
    }
  }

  openSignInForm(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      height: '450px',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.switchState(result);
    });
  }

  openSignUpForm(): void {
    const dialogRef = this.dialog.open(SignUpFormComponent, {
      height: '600px',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.switchState(result);
    });
  }

  openForgotPasswordForm(): void {
    const dialogRef = this.dialog.open(ForgotPasswordFormComponent, {
      height: '275px',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.switchState(result);
    });
  }

  openVerificationForm(): void {
    const dialogRef = this.dialog.open(VerifyEmailFormComponent, {
      height: '275px',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.switchState(result);
    });
  }

  openNewPasswordForm(): void {
    const dialogRef = this.dialog.open(NewPasswordFormComponent, {
      height: '375px',
      width: '500px'
    });
  }

  toggleDropdown(): void {
    const dropdown = document.querySelector('.options');

    dropdown?.classList.toggle('active');
  }

  /**
   * Logs user out of website and re-routes the user to the homepag
   */
  logout(): void {
    localStorage.removeItem('currUser');
    this.data.updateLoggedInStatus(false);
    this.router.navigate(['/home']);
  }
}

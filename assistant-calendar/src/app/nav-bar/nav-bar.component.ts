import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { ForgotPasswordFormComponent } from './login-form/forgot-password-form/forgot-password-form.component';
import { VerifyEmailFormComponent } from './login-form/forgot-password-form/verify-email-form/verify-email-form.component';
import { NewPasswordFormComponent } from './login-form/forgot-password-form/new-password-form/new-password-form.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    public dialog: MatDialog
  ) {}

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
      case 'openVerificationForm':
        this.openVerificationForm();
        break;
      case 'openNewPassForm':
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
      height: '500px',
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
}

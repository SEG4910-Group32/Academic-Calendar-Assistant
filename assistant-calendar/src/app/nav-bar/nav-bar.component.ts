import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { ForgotPasswordFormComponent } from './login-form/forgot-password-form/forgot-password-form.component';
import { VerifyEmailFormComponent } from './login-form/forgot-password-form/verify-email-form/verify-email-form.component';
import { NewPasswordFormComponent } from './login-form/forgot-password-form/new-password-form/new-password-form.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';

import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';

import { BnNgIdleService } from 'bn-ng-idle';
import { UserFacade } from '../Facades/user.facade';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    public dialog: MatDialog,
    private data: DataService,
    private router: Router,
    private bnIdle: BnNgIdleService,
    private userFacade: UserFacade,
  ) {}

  username: string = "";

  ngOnInit() {
    this.subscribeToRedirectedValue();
    this.checkAndSetUserInfo();
    this.subscribeToLoggedInStatus();
  }
  
  private subscribeToRedirectedValue() {
    this.data.currRedirectedVal.subscribe(val => {
      if (val === "true") {
        this.openSignInForm();
      }
    });
  }
  
  private checkAndSetUserInfo() {
    const userInfo = localStorage.getItem('currUser');
    console.log(userInfo);
    if (userInfo) {
      this.setUserDetails(userInfo);
    }
  }
  
  private subscribeToLoggedInStatus() {
    this.data.loggedInStatus.subscribe(val => {
      if (val) {
        this.fetchUserDetails();
      } else {
        this.clearUserInfo();
      }
    });
  }
  
  private fetchUserDetails() {
    const userId = localStorage.getItem('currUser');
    if (userId) {
      this.userFacade.getUserById(userId).subscribe(
        (user) => {
          this.setUserDetails(user);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }
  
  private setUserDetails(user: any) {
    this.username = `${user.firstName} ${user.lastName}`;
    this.updateUI();
    this.startIdleTimeoutTimer(5000);
  }
  
  private clearUserInfo() {
    this.username = '';
    this.updateUI();
  }
  
  private updateUI() {
    const prompts = document.querySelector('.prompts');
    const loggedIn = document.querySelector('.logged-in');
  
    if (prompts && loggedIn) {
      if (this.username) {
        prompts.classList.add('invisible');
        loggedIn.classList.remove('invisible');
      } else {
        prompts.classList.remove('invisible');
        loggedIn.classList.add('invisible');
      }
    }
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

  /**
   * Function that starts idle session timeout timer
   * @param time number amount of time in seconds before logging out user
   */
  startIdleTimeoutTimer(time: number): void {
    this.bnIdle.startWatching(time).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.logout();
        this.bnIdle.stopTimer();
      }
    });
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
   * Opens logout dialog and if the user confirms they want to logout,
   * re-routes the user to the homepage
   */
  logout(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      height: '150px',
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (!res && !localStorage.getItem('currUser')) {
        this.data.updateLoggedInStatus(false);
        this.bnIdle.stopTimer();
        this.router.navigate(['/home']);
      }
    });

  }
}

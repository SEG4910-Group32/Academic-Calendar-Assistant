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
    this.data.currRedirectedVal.subscribe(val => {
      if (val === "true") {
        this.openSignInForm();
      }
    });

    let userInfo = localStorage.getItem('currUser');
    let prompts = document.querySelector('.prompts');
    let loggedIn = document.querySelector('.logged-in');

    // if the user logs in, display the username in nav-bar
    this.data.loggedInStatus.subscribe(val => {

      if (val) {
       // this.userFacade.createUser(localStorage.getItem('currUser') as string)
        userInfo = localStorage.getItem('currUser');
        
          this.userFacade.getUserById(localStorage.getItem('currUser') as string).subscribe(
            (user) => {
              // Assuming the 'name' property exists in the User object
              const userName = user.username;
              console.log('User Name:', userName);
      
              // Now, you can update your UI with the user name
              // For example, you can bind it to a property in your component
              //this.username = userName;
            },
            (error) => {
              console.error('Error fetching user details:', error);
            }
          );
        
    
        if (userInfo) {
          let obj = JSON.parse(userInfo);
          this.username = obj.firstName + " " + obj.lastName;
        }
    
        prompts?.classList.add('invisible');
        loggedIn?.classList.remove('invisible');
        
        this.startIdleTimeoutTimer(5000);
      }
      else {
        prompts?.classList.remove('invisible');
        loggedIn?.classList.add('invisible');
      }
    });

    // if the user was already logged in, display the username in nav-bar
    if (userInfo) {
      let obj = JSON.parse(userInfo);
      this.username = obj.firstName + " " + obj.lastName;
      
      prompts?.classList.add('invisible');
      loggedIn?.classList.remove('invisible');

      this.startIdleTimeoutTimer(50000);
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
      if (res == 'logout') {
        localStorage.removeItem('currUser');
        this.data.updateLoggedInStatus(false);
        this.bnIdle.stopTimer();
        this.router.navigate(['/home']);
      }
    });

  }
}

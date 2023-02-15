import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './nav-bar/login-form/login-form.component';
import { SignUpFormComponent } from './nav-bar/sign-up-form/sign-up-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ForgotPasswordFormComponent } from './nav-bar/login-form/forgot-password-form/forgot-password-form.component';
import { VerifyEmailFormComponent } from './nav-bar/login-form/forgot-password-form/verify-email-form/verify-email-form.component';
import { NewPasswordFormComponent } from './nav-bar/login-form/forgot-password-form/new-password-form/new-password-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignUpFormComponent,
    NavBarComponent,
    ForgotPasswordFormComponent,
    VerifyEmailFormComponent,
    NewPasswordFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

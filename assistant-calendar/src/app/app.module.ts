import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from 'src/material.module';

import { AppComponent } from './app.component';

import { FindScheduleComponent } from './find-schedule/find-schedule.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';

import { LoginFormComponent } from './nav-bar/login-form/login-form.component';
import { SignUpFormComponent } from './nav-bar/sign-up-form/sign-up-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ForgotPasswordFormComponent } from './nav-bar/login-form/forgot-password-form/forgot-password-form.component';
import { VerifyEmailFormComponent } from './nav-bar/login-form/forgot-password-form/verify-email-form/verify-email-form.component';
import { NewPasswordFormComponent } from './nav-bar/login-form/forgot-password-form/new-password-form/new-password-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HomepageComponent } from './homepage/homepage.component';
import { CreateSchedulePageComponent } from "./create-schedule-page/create-schedule-page.component";
import { CreateScheduleComponent } from './create-schedule-page/create-schedule/create-schedule.component';
import { ImportScheduleComponent } from './create-schedule-page/import-schedule/import-schedule.component';
import { SubmitScheduleComponent } from './create-schedule-page/submit-schedule/submit-schedule.component';
import { AddScheduleComponent } from './create-schedule-page/create-schedule/add-schedule/add-schedule.component';
import { ImportSyllabusComponent } from './create-schedule-page/import-schedule/import-syllabus/import-syllabus.component';
import { GenerateScheduleIdComponent } from './create-schedule-page/submit-schedule/generate-schedule-id/generate-schedule-id.component';

import { HttpClientModule } from "@angular/common/http";
import { NgxFileDropModule } from "ngx-file-drop";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,

    FindScheduleComponent,
    LoginFormComponent,
    SignUpFormComponent,
    NavBarComponent,
    ForgotPasswordFormComponent,
    VerifyEmailFormComponent,
    NewPasswordFormComponent,
    HomepageComponent,
    CreateSchedulePageComponent,
    CreateScheduleComponent,
    ImportScheduleComponent,
    SubmitScheduleComponent,
    AddScheduleComponent,
    ImportSyllabusComponent,
    GenerateScheduleIdComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

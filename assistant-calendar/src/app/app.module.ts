import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import { CreateSchedulePageComponent } from "./create-schedule-page/create-schedule-page.component";
import { CreateScheduleComponent } from './create-schedule-page/create-schedule/create-schedule.component';
import { ImportScheduleComponent } from './create-schedule-page/import-schedule/import-schedule.component';
import { SubmitScheduleComponent } from './create-schedule-page/submit-schedule/submit-schedule.component';


@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        CreateSchedulePageComponent,
        CreateScheduleComponent,
        ImportScheduleComponent,
        SubmitScheduleComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        MatIconModule,
        MatButtonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ]
})
export class AppModule { }

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
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import { AddScheduleComponent } from './create-schedule-page/create-schedule/add-schedule/add-schedule.component';
import { ImportSyllabusComponent } from './create-schedule-page/import-schedule/import-syllabus/import-syllabus.component';
@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        CreateSchedulePageComponent,
        CreateScheduleComponent,
        ImportScheduleComponent,
        SubmitScheduleComponent,
        AddScheduleComponent,
        ImportSyllabusComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        MatIconModule,
        MatButtonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatGridListModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogModule,
        MatRippleModule,
        MatFormFieldModule,
        MatButtonModule
    ]
})
export class AppModule { }

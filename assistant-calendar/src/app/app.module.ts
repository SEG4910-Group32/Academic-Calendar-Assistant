import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateSchedulePageComponent } from "./create-schedule-page/create-schedule-page.component";
import { CreateScheduleComponent } from './create-schedule-page/create-schedule/create-schedule.component';
import { ImportScheduleComponent } from './create-schedule-page/import-schedule/import-schedule.component';
import { SubmitScheduleComponent } from './create-schedule-page/submit-schedule/submit-schedule.component';
import { AddScheduleComponent } from './create-schedule-page/create-schedule/add-schedule/add-schedule.component';
import { ImportSyllabusComponent } from './create-schedule-page/import-schedule/import-syllabus/import-syllabus.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgxFileDropModule } from "ngx-file-drop";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatNativeDateModule } from '@angular/material/core'; 
import {MatChipsModule} from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
        FormsModule,
        HttpClientModule,
        NgxFileDropModule,
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
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        ScrollingModule,
        MatNativeDateModule,
        MatChipsModule,
        DragDropModule
        
    ]
})
export class AppModule { }

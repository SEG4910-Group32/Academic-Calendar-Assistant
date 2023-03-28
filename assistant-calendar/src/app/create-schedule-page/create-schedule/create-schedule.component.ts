import { Component, ViewChild , Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { Deliverable } from './deliverable';
import { mockSchedules } from './mock-schedules';
import {MatAccordion} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SendScheduleService } from '../send-schedule.service';


@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent {

  showFiller = false;



  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  type?: string ;
  dueDate?: string;

  panelOpenState = false;

  deliverables = mockSchedules;
  
  //
  private endpoint = 'http://localhost:3000/event/';

  constructor(public dialog: MatDialog, private sendSchduleSvc: SendScheduleService,private http: HttpClient) {
    sendSchduleSvc.sc = mockSchedules
  }

  getEvents(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }


  //adding new task to db
  createEvent = async (newEvent: Object) => {

    this.http.post("http://localhost:3000/event/create",newEvent).subscribe(
      resp => {
        // this.showSucessMessage = true;
        // this.serverErrorMessages = "";
        
        // setTimeout(() => this.showSucessMessage = false, 4000);
        // this.signUpForm.reset();
      },
      err => {
        if (err.status === 422) {
          console.log(err.error);
          
          // this.serverErrorMessages = err.error.join('\n');
        }
        else {
          // this.serverErrorMessages = 'Unknown error occurred';
        }
      }
    )}
  

  openDialog(): void {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
     data: {task: this.type, dueDate: this.dueDate},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.type = result.type;
      this.dueDate = result.dueDate;
      mockSchedules.push({type:result.type , dueDate:result.dueDate, startDate: result.startDate,location: result.location,description: result.description });
      console.log("result.type",result.type);
      console.log(mockSchedules);
      this.sendSchduleSvc.sc = mockSchedules;
      this.createEvent({type:result.type , dueDate:result.dueDate, startDate: result.startDate,location: result.location,description: result.description })
    });
    
  }



  January = ['Assignment 1','Assignment 1','Assignment 1','Assignment 1','Assignment 1'];
  February = ['Assignment 2','Assignment 1','Assignment 1','Assignment 1'];
  March = ['Assignment 3'];
  April = ['Assignment 4'];


}



import { Component, ViewChild , Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
import { GetAllEventsService } from './get-all-events.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit{

  showFiller = false;

  //to save the data from db
  public listOfDeliverables: Deliverable[] = [];

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

  constructor(public dialog: MatDialog, private sendSchduleSvc: SendScheduleService,private http: HttpClient, private _getAllEventsService:GetAllEventsService) {
    sendSchduleSvc.sc = mockSchedules
  }

  getEvents(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }


  //adding new task to db
  createEvent = async (newEvent: Object) => {

    this.http.post("http://localhost:3000/event/create",newEvent).subscribe(
      resp => {
      },
      err => {
        if (err.status === 422) {
          console.log(err.error);
        }
        else {
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
      mockSchedules.push({_id:result._id,type:result.type , dueDate:result.dueDate, startDate: result.startDate,location: result.location,description: result.description });
      console.log("result.type",result.type);
      console.log(mockSchedules);
      this.sendSchduleSvc.sc = mockSchedules;
      this.createEvent({type:result.type , dueDate:result.dueDate, startDate: result.startDate,location: result.location,description: result.description })
    });
    
  }

//updating 
update = async (event: Object) => {
  
  // console.log(event.type)
  // var path = ("http://localhost:3000/event/:6429b8b65dfd48669ee8e13f");
  console.log(event)
  var eve = event as Deliverable;
  console.log("http://localhost:3000/event/:"+eve._id);
  const path = ("http://localhost:3000/event/:"+eve._id); 
  this.http.patch("http://localhost:3000/event/"+Object(eve._id), event).subscribe(res => {
    console.log(res);
  }, err => {
    console.log("error");
    console.log(err.response.data)
  });
};
// updateEvent(event: Object){
//   this.update(event)
// }

 ngOnInit(){
  this._getAllEventsService.getUsers().
  subscribe(data => this.listOfDeliverables = data);
 }
  January = ['Assignment 1','Assignment 1','Assignment 1','Assignment 1','Assignment 1'];
  February = ['Assignment 2','Assignment 1','Assignment 1','Assignment 1'];
  March = ['Assignment 3'];
  April = ['Assignment 4'];


}



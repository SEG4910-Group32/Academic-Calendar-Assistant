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
  
  //to organize tasks by month 
  public January: string[] = [];
  public February: string[] = [];
  public March : string[] = [];
  public April: string[] = [];
  public May : string[] = [];
  public June: string[] = [];
  public July: string[] = [];
  public August: string[] = [];
  public September: string[] = [];
  public October: string[] = [];
  public  November: string[] = [];
  public December: string[] = [];


  private endpoint = 'http://localhost:3000/event/';

  constructor(public dialog: MatDialog, private sendSchduleSvc: SendScheduleService,private http: HttpClient, private _getAllEventsService:GetAllEventsService) {
    sendSchduleSvc.sc = this.listOfDeliverables
  }

  getEvents(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }


  // //adding new task to db
  // createEvent = async (newEvent: Object) => {

  //   this.http.post("http://localhost:3000/event/create",newEvent).subscribe(
  //     resp => {
  //     },
  //     err => {
  //       if (err.status === 422) {
  //         console.log(err.error);
  //       }
  //       else {
  //       }
  //     }
  //   )}
  
    //testing the new collection
      //adding new task to db
      createEvent = async (newEvent: Object) => {

    this.http.post("http://localhost:3000/currentSchedule/create",newEvent).subscribe(
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
      mockSchedules.push({scheduleId:result.scheduleId,_id:result._id,type:result.type , dueDate:result.dueDate, startDate: result.startDate,location: result.location,description: result.description });
      console.log("result.type",result.type);
      console.log(mockSchedules);
      this.sendSchduleSvc.sc = this.listOfDeliverables;
      this.createEvent({scheduleId:"",type:result.type , dueDate:result.dueDate, startDate: result.startDate,location: result.location,description: result.description })
      this.organizeTasksIntoMonths()
    });
    
  }

//updating 
update = async (event: Object) => {
  console.log(event)
  var eve = event as Deliverable;
  this.http.patch("http://localhost:3000/currentSchedule/"+eve._id, event).subscribe(res => {
    console.log(res);
  }, err => {
    console.log("error");
    console.log(err.response.data)
  });
};

//deleting 
delete = async (event: Object) => {
  console.log(event)
  var eve = event as Deliverable;
  this.http.delete("http://localhost:3000/currentSchedule/"+eve._id, event).subscribe(res => {
    console.log(res);
  }, err => {
    console.log("error");
    console.log(err.response.data)
  });
};

 ngOnInit(){
  this._getAllEventsService.getUsers().
  subscribe(data => this.listOfDeliverables = data);
  this.organizeTasksIntoMonths();
 }


 
//organizes tasks by their due date to show in the  Tasks by month tab
organizeTasksIntoMonths(){
  const sth = this.listOfDeliverables;
   for (let i = 0; i < this.listOfDeliverables.length; i++) {
    const deliverable = this.listOfDeliverables[i];
  console.log(deliverable.dueDate + ' - ' );
  const date = new Date(deliverable.dueDate);
const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-based index
if(month == 1){
  this.January.push(deliverable.type)
}
if(month == 2){
  this.February.push(deliverable.type)
}
if(month == 3){
  this.March.push(deliverable.type)
}
if(month == 4){
  this.April.push(deliverable.type)
}
if(month == 5){
  this.May.push(deliverable.type)
}
if(month == 6){
  this.June.push(deliverable.type)
}
if(month == 7){
  this.July.push(deliverable.type)
}
if(month == 8){
  this.August.push(deliverable.type)
}
if(month == 9){
  this.September.push(deliverable.type)
}
if(month == 10){
  this.October.push(deliverable.type)
}
if(month == 11){
  this.November.push(deliverable.type)
}
else{
  this.December.push(deliverable.type)
}
console.log("month is "+month);
}
}



}



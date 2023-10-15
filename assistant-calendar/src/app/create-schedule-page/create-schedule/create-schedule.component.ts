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
import { Observable, tap } from 'rxjs';
import { SendScheduleService } from '../send-schedule.service';
import { GetAllEventsService } from './get-all-events.service';
import { CurrentEventsService } from 'src/services/current-events.service';
import { Event } from 'src/app/Models/event.model';
import { EventFacade } from 'src/app/Facades/event.facade';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit{

  createNewDeliverableForm = new FormGroup({
    adeliverable: new FormControl(),
    adescription: new FormControl(),
    alocation: new FormControl()
  });


  showFiller = false;

  //to save the data from db
  public listOfDeliverables: Event[] = [];

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

  constructor(public dialog: MatDialog, private http: HttpClient, private _getAllEventsService:GetAllEventsService, private currentEventsSvc: CurrentEventsService) {
    // sendSchduleSvc.sc = this.listOfDeliverables
    currentEventsSvc.eventList = this.listOfDeliverables;
  }


    //adding new task to db
    createEvent = async (newEvent: Event) => {

      this.currentEventsSvc.eventList.push(newEvent);

    // this.http.post("http://localhost:3000/currentSchedule/create",newEvent).pipe(
    //   tap(()=>{ 
    //     this._getAllEventsService.refreshRequired.next(); 
    //     this.getAll();
    //   })).subscribe(
    //   resp => {
    //   },
    //   err => {
    //     if (err.status === 422) {
    //       console.log(err.error);
    //     }
    //     else {
    //     }
    //   }
    // )
  
  
  }

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
      this.createEvent({name: result.name, scheduleid:"",type:result.type , endTime:result.dueDate, startTime: result.startDate,location: result.location,description: result.description });
      this.organizeTasksIntoMonths();
    });
    
  }

//updating 
update = async (event: Event, i: number) => {
  console.log(event);
  this.emptyMonthlyTasks();
  var eve = event as Event;
  this.currentEventsSvc.eventList[i]=event;
  this.listOfDeliverables = this.currentEventsSvc.eventList;
  console.log(this.currentEventsSvc.eventList)

  // this.http.patch("http://localhost:3000/currentSchedule/"+eve._id, event).pipe(tap(()=>{ 
  //   this._getAllEventsService.refreshRequired.next();
  //   this.getAll();
  // })).subscribe(res => {
  //   console.log(res);
  // }, err => {
  //   console.log("error");
  //   console.log(err.response.data)
  // });
};

//deleting 
delete = async (event: Object, index: number) => {
  this.emptyMonthlyTasks();
  console.log(event)

  this.currentEventsSvc.eventList = this.currentEventsSvc.eventList.filter((v,i)=> i !== index);
  this.listOfDeliverables = this.currentEventsSvc.eventList;

  // var eve = event as Deliverable;
  // this.http.delete("http://localhost:3000/currentSchedule/"+eve._id, event).pipe(tap(()=>{ 
  //   this._getAllEventsService.refreshRequired.next();
  //   this.getAll();
  // })).subscribe(res => {
  //   console.log(res);
  // }, err => {
  //   console.log("error");
  //   console.log(err.response.data)
  // });
};

 ngOnInit(){
  this.getAll();
  this._getAllEventsService.refreshRequired.subscribe(Response => this.getAll());
  this.organizeTasksIntoMonths();
 }

 getAll(){

  this.listOfDeliverables = this.currentEventsSvc.eventList;
  // this._getAllEventsService.getUsers().subscribe(data => {
  //   this.listOfDeliverables = data;
  //   this.sendSchduleSvc.sc = this.listOfDeliverables;
  //   console.log("this.sendSchduleSvc.sc ",this.sendSchduleSvc.sc);
  //   console.log("List of deliverables after getAll ",this.listOfDeliverables);
  // }
  // );
  
 }
 ngAfterViewInit(){
  this.organizeTasksIntoMonths(); //we're calling the organizeTasksIntoMonths everytime we click on list of deliverables {change required}
  //may have to delete
} 
 
//organizes tasks by their due date to show in the  Tasks by month tab
organizeTasksIntoMonths(){
  //list of key values 
  const myMap = new Map<string, any>();
  console.log("calling organize tasks");
  //this.getAll();
  const sth = this.listOfDeliverables;
   for (let i = 0; i < this.listOfDeliverables.length; i++) {
    const deliverable = this.listOfDeliverables[i] as Event;
  console.log(deliverable.endTime + ' - ' );
  const date = new Date(deliverable.endTime);
const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-based index
if(month == 1 && (this.January.indexOf(deliverable.type) == -1)){
  this.January.push(deliverable.type)
}
if(month == 2 && (this.February.indexOf(deliverable.type) == -1)){
  this.February.push(deliverable.type)
}
if(month == 3 && (this.March.indexOf(deliverable.type) == -1)){
  this.March.push(deliverable.type)
}
if(month == 4 && (this.April.indexOf(deliverable.type) == -1)){
  this.April.push(deliverable.type)
}
if(month == 5 && (this.August.indexOf(deliverable.type) == -1)){
  this.May.push(deliverable.type)
}
if(month == 6 && (this.June.indexOf(deliverable.type) == -1)){
  this.June.push(deliverable.type)
}
if(month == 7 && (this.July.indexOf(deliverable.type) == -1)){
  this.July.push(deliverable.type)
}
if(month == 8 && (this.August.indexOf(deliverable.type) == -1)){
  this.August.push(deliverable.type)
}
if(month == 9 && (this.September.indexOf(deliverable.type) == -1)){
  this.September.push(deliverable.type)
}
if(month == 10 && (this.October.indexOf(deliverable.type) == -1)){
  this.October.push(deliverable.type)
}
if(month == 11 && (this.November.indexOf(deliverable.type) == -1)){
  this.November.push(deliverable.type)
}
else{
  if(this.December.indexOf(deliverable.type) == -1){
    this.December.push(deliverable.type)
  }
  
}
console.log("month is "+month);
}
}

emptyMonthlyTasks(){
  const monthsLists = [
    this.January,
    this.February,
    this.March,
    this.April,
    this.May,
    this.June,
    this.July,
    this.August,
    this.September,
    this.October,
    this.November,
    this.December
  ];
  
  for (let i = 0; i < monthsLists.length; i++) {
    monthsLists[i] = [];
  }
}

}



import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deliverable } from 'src/app/create-schedule-page/create-schedule/deliverable';
import { Event } from 'src/app/shared/event.model';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { EditEventComponent } from './edit-event/edit-event/edit-event.component';

@Component({
  selector: 'app-edit-schedule-page',
  templateUrl: './edit-schedule-page.component.html',
  styleUrls: ['./edit-schedule-page.component.css']
})
export class EditSchedulePageComponent {

  Events: any;
  displayedColumns: string[] = ['name', 'type', 'end time', 'action'];
  private endpoint = 'https://academic-calendar-backend.onrender.com/api/schedules/id/'
  dataSource: any;
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  scheduleId = localStorage.getItem("scId")
  scheduleName = localStorage.getItem("scName")
  eve = localStorage.getItem("sc")
 
  updatedEndpoint = this.endpoint + this.scheduleId
  eventIDs: any[] = [];
  eventDetails: any[] = [];
 constructor(public dialog: MatDialog,private http: HttpClient) { 
   this.Events= this.http.post(this.updatedEndpoint, { token: localStorage.getItem("currUser") });// ['SEG3102', 'SEG3101'];
 
   this.Events.subscribe(
    (response:any) => {
     this.Events = response.schedule.events
      console.log('POST request successful: this.Events', this.Events);
    },
    (error:any) => {
      console.error('POST request failed:', error);
    }
  );

  this.loadData();
   
   
 }
 
   
   getEventById(eventId: string): Observable<any> {
    const eventUrl = `https://academic-calendar-backend.onrender.com/api/events/id/${eventId}`;
    return this.http.get(eventUrl);
  }

  loadData() {
    const updatedEndpoint = this.endpoint + this.scheduleId;
    const token = localStorage.getItem("currUser");

    //gets the event id for all events in a schedule
    this.http.post(updatedEndpoint, { token }).subscribe(
      (response: any) => {
        this.Events = response.schedule.events;
        this.eventIDs = this.Events.map((event: any) => event); 
        console.log('POST request successful: this.Events', this.Events);

        // calling a GET request for each event
        this.getEventDetails();
      },
      (error: any) => {
        console.error('POST request failed:', error);
      }
    );
  }
 getEventDetails() {
  for (const eventId of this.eventIDs) {
    this.getEventById(eventId).subscribe(
      (eventData: any) => {
        
        //storing the event data 
        this.eventDetails.push(eventData)

        console.log("eventDetails", this.eventDetails)
        console.log('GET request successful for event:eventData', eventData);
      },
      (error: any) => {
        console.error('GET request failed for event:', error);
      }
    );
  }
}

  //saving the data for the event for which the edit button is clicked for
 openDialog(event: any) {
  console.log("event ",event[0]);
  const dialogRef = this.dialog.open(EditEventComponent, {
    
    //this.getEventById()
    // data: {task: this.type, dueDate: this.dueDate},
    data: { name: event[0].name,type: event[0].type, description: event[0].description , location: event[0].location, startTime: event[0].createdAt, endTime: event[0].endTime }
   });

  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed');
  //    this.type = result.type;
  //    this.dueDate = result.dueDate;
  //    mockSchedules.push({scheduleId:result.scheduleId,type:result.type,_id:result._id,name:result.name , endTime:result.endTime, startTime: result.startTime,location: result.location,description: result.description });
  //    console.log("result.type",result.type);
  //    console.log(mockSchedules);
  //    this.createEvent({name: result.name, scheduleid:"",type:result.type , endTime:result.dueDate, startTime: result.startDate,location: result.location,description: result.description });
  //    this.organizeTasksIntoMonths();
  //  });
//  this.dialog.open(EditEventComponent);
}
}

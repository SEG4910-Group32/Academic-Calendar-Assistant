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
 openDialog() {
  this.dialog.open(EditEventComponent);
}
}

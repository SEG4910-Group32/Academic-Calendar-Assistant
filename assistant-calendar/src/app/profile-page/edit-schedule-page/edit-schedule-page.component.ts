import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deliverable } from 'src/app/create-schedule-page/create-schedule/deliverable';
import { Event } from 'src/app/shared/event.model';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { EditEventComponent } from './edit-event/edit-event/edit-event.component';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

@Component({
  selector: 'app-edit-schedule-page',
  templateUrl: './edit-schedule-page.component.html',
  styleUrls: ['./edit-schedule-page.component.css']
})
export class EditSchedulePageComponent implements OnInit{

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
  editedEvent: any[]=[];

  
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
     
  
 }
  ngOnInit() {
   // throw new Error('Method not implemented.');
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

updateEvent(updatedEvent: any){
  const  editUrl = 'https://academic-calendar-backend.onrender.com/api/events'
  this.http.patch(editUrl, updatedEvent)
  .subscribe((response: any) => {
    // Handle the API response here
    console.log('Event added to the database:', response);
   
  });
}
deleteEvent(deletedEvent: any) {
  const deleteUrl = 'https://academic-calendar-backend.onrender.com/api/events';
  const token = localStorage.getItem("currUser");
  const id = deletedEvent[0]._id;

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      id: deletedEvent[0]._id,
      token: token,
    },
  };

  this.http.delete(deleteUrl, options)
    .subscribe((response: any) => {
      // Handle the API response here
      console.log('Event deleted from the database:', response);
    });
}


openDialog(event: any) {
  if (event && event[0]) {
    console.log("event ", event[0]);
    const dialogRef = this.dialog.open(EditEventComponent, {
      data: {
        name: event[0].name || '', // Add a null check here
        type: event[0].type,
        description: event[0].description,
        location: event[0].location,
        startTime: event[0].createdAt,
        endTime: event[0].endTime
      }
    });
    const token = localStorage.getItem("currUser");

    // getting the updated event data from the dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedEvent = {
          name: result.name || '',
          type: result.type || '',
          description: result.description || '',
          location: result.location || '',
          startTime: result.startTime || '',
          endTime: result.endTime || '',
          id: event[0]._id,
          token: token
        };

        console.log('The dialog was closed, result: ', updatedEvent);
        this.updateEvent(updatedEvent);
      }
    });
  }
}

}

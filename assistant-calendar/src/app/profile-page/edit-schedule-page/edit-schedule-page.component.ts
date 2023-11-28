import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { EditEventComponent } from './edit-event/edit-event/edit-event.component';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { EventFacade } from 'src/app/Facades/event.facade';
import { ScheduleFacade } from 'src/app/Facades/schedule.facade';
import { AddEventComponent } from './add-event/add-event/add-event.component';
import { CurrentEventsService } from 'src/services/current-events.service';
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
  token = localStorage.getItem("currUser")

  updatedEndpoint = this.endpoint + this.scheduleId
  eventIDs: any[] = [];
  eventDetails: any[] = [];
  editedEvent: any[]=[];
  noEventsExist: boolean = false;

 constructor(public dialog: MatDialog,private http: HttpClient,private eventFacade: EventFacade, private scheduleFacade: ScheduleFacade ,private currentEventsSvc: CurrentEventsService) {}

  ngOnInit(): void {
    this.loadData();
  }

 // gets the event information(like id, name etc) in order to display the events
   getEventById(eventId: string): Observable<any> {

    //getEventById
    return this.eventFacade.getEventById(eventId);
  }

  createEvent = async (newEvent: any) => {
    console.log("NEW EVENT", newEvent)

    this.currentEventsSvc.eventList.push(newEvent);

}

  loadData() {
    const updatedEndpoint = this.endpoint + this.scheduleId;
    const token = localStorage.getItem("currUser");

    //to change
    //gets the event id for all events in a schedule
    this.scheduleFacade.getScheduleById(this.scheduleId as string,token as string).subscribe(
      (response: any) => {
        this.Events = response.schedule.events;
        this.eventIDs = this.Events.map((event: any) => event);
        console.log('POST request successful: this.Events', this.Events);
        if (this.Events.length === 0) {
          this.noEventsExist = true
        }
        else{
          this.noEventsExist = false;
          // calling a GET request for each event
          this.getEventDetails();
        }

      },
      (error: any) => {
        console.error('POST request failed:', error);
      }
    );
  }

getEventDetails() {
  //this.eventDetails = [];
  for (const eventId of this.eventIDs) {
    this.getEventById(eventId).subscribe(
      (eventData: any) => {
        
        this.eventDetails.push([eventData]);

        console.log("eventDetails", this.eventDetails);
        console.log('GET request successful for getEventDetails event:eventData', eventData);
      },
      (error: any) => {
        console.error('GET request failed for event:', error);
      }
    );
  }
}

//to change
updateEvent(updatedEvent: any){
  const  editUrl = 'https://academic-calendar-backend.onrender.com/api/events'

  updatedEvent.id = updatedEvent.id as string
  console.log("updated event is" ,updatedEvent, "token ", localStorage.getItem("currUser") as string)
  this.eventFacade.updateEvent(updatedEvent)
    .subscribe((response: any) => {
    // Handle the API response here
    console.log('Event updated succesfully, changes added to the database:', response);

  },
  (error: any) => {
    console.error('GET request failed for event:', error);
  });
}


//method used to delete an event
deleteEvent(deletedEvent: any) {

  console.log(deletedEvent[0]._id, "deletedEvent[0]._id")

  this.eventFacade.deleteEvent( localStorage.getItem("currUser") as string, deletedEvent[0]._id as string)
    .subscribe((response: any) => {
    
      console.log('Event deleted from the database:', response);
       this.eventDetails = []
       this.loadData()
    });
}

//opens the edit event dialog
openDialog(event: any) {
  if (event && event[0]) {
    console.log("event ", event[0]);
    const dialogRef = this.dialog.open(EditEventComponent, {
      data: {
        name: event[0].name || '', 
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
        this.eventDetails = []
        this.loadData()
      }
    });
  }
}

//opens the add event dialog
openAddEventDialog(){
  const dialogRef = this.dialog.open(AddEventComponent, {
    data: {
      token: this.token, 
      scheduleId: this.scheduleId,
      type:"",
      dueDate:"",
      startDate:"",
      location: "",
      description:""
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if (result) {
      console.log("schedule", this.scheduleId)
      const scheduleId = this.scheduleId || ''; 
      this.eventFacade.createEvent({
        name: result.name,
        schedule: scheduleId as string ,
        scheduleid: scheduleId ,
        token: localStorage.getItem("currUser"),
        //token: this.token ,
        type: result.type,
        endTime: result.dueDate,
        startTime: result.startDate,
        location: result.location,
        description: result.description
      });
    }
 });
}

}

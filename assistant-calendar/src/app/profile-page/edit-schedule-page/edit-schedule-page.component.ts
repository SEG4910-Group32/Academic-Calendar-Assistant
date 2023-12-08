import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditEventComponent } from './edit-event/edit-event/edit-event.component';
import { AddEventComponent } from './add-event/add-event/add-event.component';
import { EventFacade } from 'src/app/Facades/event.facade';

@Component({
  selector: 'app-edit-schedule-page',
  templateUrl: './edit-schedule-page.component.html',
  styleUrls: ['./edit-schedule-page.component.css']
})

/**
 * we created the edit schedule page for the user to be able to edit the events for the schedules that they created
 * when the user clicks on edit in the profile page, they will be navigated to this page http://localhost:4200/edit-schedule
 * From this page, the user can do 3 things, add event, edit event or delete event
 * when the user clicks on add event, a new dialog opens up on top of the page with input fileds for a new event
 * when the user clicks on edit next to an event, the edit event dialog opens up
 * when the user clicks on delete, the event will be deleted and the list of events will refresh automatically
 */
export class EditSchedulePageComponent implements OnInit {

  events: any[] = [];
  eventDetails: any[] = [];
  noEventsExist: boolean = false;

  //getting the schedule id and schedule name of the schedule that we want to edit
  scheduleId: string | null = localStorage.getItem("scId");
  scheduleName: string | null = localStorage.getItem("scName");

  constructor(
    public dialog: MatDialog,
    private eventFacade: EventFacade,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  //gets the list of the events for the current schedule by calling the getEventByschedule method in eventfacade which makes an API call to the backend
  loadData() {

    //returns all the IDs for the events for the current schedule
    this.eventFacade.getEventBySchedule(this.scheduleId as string).subscribe(
      (events: any[]) => {
        this.events = events;
        this.noEventsExist = this.events.length === 0;

        if (!this.noEventsExist) {
          this.loadEventDetails();
        }
      },
      (error: any) => {
        console.error('Failed to load events:', error);
      }
    );
  }

  //gets the event details using the event id
  loadEventDetails() {
    this.eventDetails = [];

    this.events.forEach(event => {
      const eventId = event._id;

      this.eventFacade.getEventById(eventId).subscribe(
        (eventData: any) => {
          this.eventDetails.push([eventData]);
          console.log('Event details loaded successfully:', eventData);
        },
        (error: any) => {
          console.error('Failed to load event details:', error);
        }
      );
    });
  }


  //called when the user edits an event, updates the event in the database and refreshes the event list
  updateEvent(updatedEvent: any, eventId: string) {
    updatedEvent.id = updatedEvent.id as string
    this.eventFacade.updateEvent(eventId, localStorage.getItem("currUser") as string, updatedEvent).subscribe(
      (response: any) => {
        console.log('Event updated successfully, changes added to the database:', response);
        this.clearEventData();
        this.loadData();
      },
      (error: any) => {
        console.error('Failed to update event:', error);
      }
    );
  }

  //used when a user deletes an event, deletes the event from the database and refreshes the event list
  deleteEvent(eventId: string) {
    this.eventFacade.deleteEvent(localStorage.getItem("currUser") as string, eventId).subscribe(
      (response: any) => {
        console.log('Event deleted from the database:', response);
        this.clearEventData();
        this.loadData();
      },
      (error: any) => {
        console.error('Failed to delete event:', error);
      }
    );
  }

  //sends the event data to the edit event dialog
  openEditDialog(event: any) {
    if (event) {
      const dialogRef = this.dialog.open(EditEventComponent, {
        data: this.getDialogDataFromEvent(event)
      });

      //updates the event after the dialog is closed
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedEvent = this.getUpdatedEventData(result);
          this.updateEvent(updatedEvent, event._id as string);
        }
      });
    }
  }

  openAddEventDialog() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      data: {
        token: localStorage.getItem("currUser"),
        scheduleId: this.scheduleId,
        type: "",
        dueDate: "",
        startDate: "",
        location: "",
        description: ""
      }
    });

    //uses the data from the new event to create new event when add event dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createNewEvent(result);
      }
    });
  }

  //function for creating new event
  createNewEvent(result: any) {
    this.eventFacade.createEvent({
      name: result.name,
      schedule: this.scheduleId as string,
      scheduleid: this.scheduleId,
      token: localStorage.getItem("currUser"),
      type: result.type,
      endTime: result.dueDate,
      startTime: result.startDate,
      location: result.location,
      description: result.description
    }).subscribe(() => {
      this.clearEventData();
      this.loadData();
    });
  }

  private clearEventData() {
    this.eventDetails = [];
  }

  private getDialogDataFromEvent(event: any) {
    return {
      name: event.name || '',
      type: event.type,
      description: event.description,
      location: event.location,
      startTime: event.createdAt,
      endTime: event.endTime
    };
  }

  private getUpdatedEventData(result: any) {
    return {
      name: result.name || '',
      type: result.type || '',
      description: result.description || '',
      location: result.location || '',
      startTime: result.startTime || '',
      endTime: result.endTime || ''
    };
  }
}

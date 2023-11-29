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
export class EditSchedulePageComponent implements OnInit {

  events: any[] = [];
  eventDetails: any[] = [];
  noEventsExist: boolean = false;

  scheduleId: string | null = localStorage.getItem("scId");
  scheduleName: string | null = localStorage.getItem("scName");

  constructor(
    public dialog: MatDialog,
    private eventFacade: EventFacade,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
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

  openEditDialog(event: any) {
    if (event) {
      const dialogRef = this.dialog.open(EditEventComponent, {
        data: this.getDialogDataFromEvent(event)
      });

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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createNewEvent(result);
      }
    });
  }

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

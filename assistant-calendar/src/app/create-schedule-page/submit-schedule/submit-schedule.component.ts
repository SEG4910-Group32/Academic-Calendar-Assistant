import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CurrentEventsService } from 'src/services/current-events.service';
import { ScheduleFacade } from 'src/app/Facades/schedule.facade';
import { Schedule } from 'src/app/Models/schedule.model';
import { GenerateScheduleIdComponent } from "./generate-schedule-id/generate-schedule-id.component";
import { Event } from 'src/app/Models/event.model';


@Component({
  selector: 'app-submit-schedule',
  templateUrl: './submit-schedule.component.html',
  styleUrls: ['./submit-schedule.component.css']
})
export class SubmitScheduleComponent {

  scheduleName: string | undefined;
  scheduleDescription: string | undefined
  googleCheckbox: boolean = false;
  outlookCheckbox: boolean = false;
  generatedId: string | null = null;
  scheduleInDB!: Schedule;
  tempList: Event[] = [];

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private scheduleFacadeSvc: ScheduleFacade,
    private currentEventsSvc: CurrentEventsService,
  ) {}

  createScheduleAndEvents() {
    if (this.currentEventsSvc.eventList.length !== 0) {
      const newSchedule: Schedule = {
        id: undefined,
        owner: undefined,
        name: this.scheduleName,
        description: this.scheduleDescription,
        password: undefined,
        subscribedUsers: undefined,
        events: undefined,
      };

      this.scheduleFacadeSvc.createSchedule(newSchedule).subscribe(returnSchedule => {
        this.scheduleInDB = new Schedule(returnSchedule.schedule);

        const scheduleBody = {
          id: this.scheduleInDB.id,
          events: this.currentEventsSvc.eventList,
        };

        this.scheduleFacadeSvc.createEvents(scheduleBody, this.scheduleInDB.id as string, localStorage.getItem("currUser") as string).subscribe(returnSchedule => {
          console.log('Schedule and events created successfully!', returnSchedule);
          // Open dialog to display the generated ID
          this.openGenerateScheduleIdDialog(this.scheduleInDB.id as string);
        });
      });
    } else {
      console.log("No Events");
    }
  }

  openGenerateScheduleIdDialog(generatedId: string): void {
    const dialogRef = this.dialog.open(GenerateScheduleIdComponent, { data: { generatedId }, height: '350px', width: '483px', panelClass: 'dialogClass' });
  }

  openImportDialog() {
    this.createScheduleAndEvents();
  }

  downloadIcs() {
    const schedule = this.currentEventsSvc.eventList;

    // Begin ICS file
    const calendarData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0'
    ];

    // Event details
    schedule.forEach((element: Event) => {
      if (element.endTime && element.type) {
        calendarData.push(
          'BEGIN:VEVENT',
          element.description ? 'DESCRIPTION:' + element.description : '',
          element.startTime ? 'DTSTART:' + new Date(element.startTime).toISOString() : '',
          'DTEND:' + new Date(element.endTime).toISOString(),
          element.location ? 'LOCATION:' + element.location : '',
          'SUMMARY:' + element.type,
          'TRANSP:TRANSPARENT',
          'END:VEVENT'
        );
      }
    });

    // End Calendar data
    calendarData.push(
      'END:VCALENDAR'
    );

    console.log('Calendar Data:', calendarData.join('\n'));
    const blob = new Blob([calendarData.join('\n')], { type: 'text/calendar' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'schedule.ics');
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the DOM
    document.body.removeChild(link);
  }

}


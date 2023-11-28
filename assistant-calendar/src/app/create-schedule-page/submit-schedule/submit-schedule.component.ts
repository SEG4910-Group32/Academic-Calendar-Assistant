import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CurrentEventsService } from 'src/services/current-events.service';
import { ScheduleFacade } from 'src/app/Facades/schedule.facade';
import { Schedule } from 'src/app/Models/schedule.model';
import { googleCalendar } from '../../../services/googleCalendar.service';
import { GenerateScheduleIdComponent } from "./generate-schedule-id/generate-schedule-id.component";

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

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private scheduleFacadeSvc: ScheduleFacade,
    private currentEventsSvc: CurrentEventsService,
    private googleCalendarService: googleCalendar
  ) {}

  ngOnInit() {}

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
        });
      });
    } else {
      console.log("No Events");
    }
  }

  openImportDialog() {
    this.dialog.open(GenerateScheduleIdComponent, { height: '350px', width: '483px', panelClass: 'dialogClass' });
    this.createScheduleAndEvents();
  }
}

/*
  //need to make sure that some of the fields are not required
  //checks needed before creating the schedule otherwise ics will be corrupted{changes required}
  downloadIcs() {
    const schedule = this.tempList;
    console.log("schedule", schedule);

    let id = 'id123';
    let createdTime = new Date().toISOString();

    //Begin ics file
    var calendarData = new Array;
    calendarData.push('data:text/calendar;charset=utf8,',
      'BEGIN:VCALENDAR',
      'VERSION:2.0'
    );

    // Event details
    schedule.forEach(element => {


      if (element.description && element.startTime && element.endTime && element.location && element.type)
        calendarData.push('BEGIN:VEVENT',
          'DESCRIPTION:' + element.description,
          'DTSTART:' + new Date(element.startTime).toISOString().substring(0, 10),
          'DTEND:' + new Date(element.endTime).toISOString().substring(0, 10),
          'LOCATION:' + element.location,
          'SUMMARY:' + element.type,
          'TRANSP:TRANSPARENT',
          'END:VEVENT');

    });




    // End Calendar data
    calendarData.push('END:VCALENDAR',
      'UID:' + id,
      'DTSTAMP:' + createdTime,
      'PRODID:website-1.0');

    console.log("test data: \n" + calendarData.join('\n'));


    const blob = new Blob([calendarData.join('\n')], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);

  }
*/

  //the id should be generated in the generateScheduleId component
 /* openImportDialog() {
    this.dialog.open(GenerateScheduleIdComponent, { height: '350px', width: '483px', panelClass: 'dialogClass' });
    this.createScheduleAndEvents(new Schedule({ name: this.scheduleName, description: this.scheduleDescription }));
  };


  async generateUniqueId(): Promise<string> {
    const chars = '0123456789abcdef';
    let id = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      id += chars[randomIndex];
    }

    const checkUniqueId = async (id: string): Promise<boolean | undefined> => {
      return this.http
        .get<boolean>(`/schedule/check/id/${id}`)
        .pipe(map((result) => !!result))
        .toPromise()
        .catch(() => false);
    };

    return id;
  }
*/



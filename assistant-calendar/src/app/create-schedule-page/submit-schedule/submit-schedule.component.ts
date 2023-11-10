import { Component, Inject } from '@angular/core';
import { GenerateScheduleIdComponent } from "./generate-schedule-id/generate-schedule-id.component";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SendScheduleService } from '../send-schedule.service';
import { Deliverable } from '../create-schedule/deliverable';
import { HttpClient } from '@angular/common/http';
import { GetAllEventsService } from '../create-schedule/get-all-events.service';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { EventFacade } from 'src/app/Facades/event.facade';
import { CurrentEventsService } from 'src/services/current-events.service';
import { ScheduleFacade } from 'src/app/Facades/schedule.facade';
import { Schedule } from 'src/app/Models/schedule.model';
import { googleCalendar } from './googleCalendar.service';

@Component({
  selector: 'app-submit-schedule',
  templateUrl: './submit-schedule.component.html',
  styleUrls: ['./submit-schedule.component.css']
})
export class SubmitScheduleComponent {

  scheduleName: string | undefined;
  googleCheckbox: boolean = false;
  outlookCheckbox: boolean = false;
  generatedId: string | null = null;
  scheduleInDB!: Schedule;
  private endpoint = "https://academic-calendar-backend.onrender.com";
  constructor(public dialog: MatDialog, private http: HttpClient, private scheduleFacadeSvc: ScheduleFacade, private currentEventsSvc: CurrentEventsService, private _getAllEventsService: GetAllEventsService, private eventsFacade: EventFacade, private googleCalendarService: googleCalendar) {

  }

  //the id should be generated in the generateScheduleId component
  openImportDialog() {
    this.dialog.open(GenerateScheduleIdComponent, { height: '350px', width: '483px', panelClass: 'dialogClass' });


    this.createSchedule(new Schedule({ name: this.scheduleName }));



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
  //to save the data from db
  public listOfDeliverables: Deliverable[] = [];
  private tempList: Deliverable[] = [];

  createSchedule(newSchedule: Schedule) {
    const createdTime = new Date().toISOString();

    if (this.currentEventsSvc.eventList.length != 0) {
      this.scheduleFacadeSvc.createSchedule(newSchedule).subscribe(returnSchedule => {
        this.scheduleInDB = new Schedule(returnSchedule.schedule);
        var scheduleBody = {
          "id": this.scheduleInDB.id,
          'events': new Array
        }
        // Create Events
        this.currentEventsSvc.eventList.forEach(event => {
          event.schedule = this.scheduleInDB.id
          event.name = event.type;
          scheduleBody.events.push({ 'name': event.type })
          if (this.googleCheckbox) {
            this.googleCalendarService.createEvent(event);
          }
        });
        this.scheduleFacadeSvc.createEvents(scheduleBody).subscribe(returnSchedule => {
        })
      });

    }
    else {
      console.log("No Events");

    }
  };


  getAll() {
    this._getAllEventsService.getUsers().subscribe(data => this.listOfDeliverables = data);
  }

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

      if (element.description && element.startDate && element.dueDate && element.location && element.type)
        calendarData.push('BEGIN:VEVENT',
          'DESCRIPTION:' + element.description,
          'DTSTART:' + new Date(element.startDate).toISOString().substring(0, 10),
          'DTEND:' + new Date(element.dueDate).toISOString().substring(0, 10),
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
  ngOnInit() {
    this._getAllEventsService.getUsers().
      subscribe(data => this.listOfDeliverables = data);
  }


}

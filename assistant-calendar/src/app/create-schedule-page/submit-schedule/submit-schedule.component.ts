import { Component, Inject } from '@angular/core';
import { GenerateScheduleIdComponent } from "./generate-schedule-id/generate-schedule-id.component";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SendScheduleService } from '../send-schedule.service';
import { Deliverable } from '../create-schedule/deliverable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-submit-schedule',
  templateUrl: './submit-schedule.component.html',
  styleUrls: ['./submit-schedule.component.css']
})
export class SubmitScheduleComponent {

  constructor(public dialog: MatDialog, private sendScheduleSvc: SendScheduleService,private http: HttpClient) { }
  openImportDialog(scheduleId: string) {
    this.dialog.open(GenerateScheduleIdComponent, {
      height: '350px',
      width: '483px',
      panelClass: 'dialogClass',
      data: { id: scheduleId },
    });
  }
  
  async generateUniqueId(): Promise<string> {
    let uniqueId = '';
  
    const checkUniqueId = async (id: string): Promise<boolean | undefined> => {
      return this.http
        .get<boolean>(`/schedule/check/id/${id}`)
        .pipe(map((result) => !!result))
        .toPromise()
        .catch(() => false);
    };
  
    let isUniqueId = false;
    while (!isUniqueId) {
      uniqueId = Math.random().toString(36).substr(2, 9);
      isUniqueId = !((await checkUniqueId(uniqueId)) ?? false);
    }
  
    return uniqueId;
  }
  
  isCreated = false;

  async createSchedule() {
    if (!this.isCreated) {
      const schedule = this.sendScheduleSvc.sc;
  
      // Generate a unique ID for the schedule
      const id = await this.generateUniqueId();
      const createdTime = new Date().toISOString();
  
      // Open the dialog with the generated schedule ID
      this.openImportDialog(id);
  
      // Send the schedule data to the server
      this.http.post('http://localhost:3000/schedule/create', { id, createdTime, schedule }).subscribe(
        (response) => {
          console.log('Schedule created successfully');
        },
        (error) => {
          console.log('Error creating schedule:', error);
        }
      );
  
      this.isCreated = true;
    }
  }
  

  downloadIcs() {
    const schedule = this.sendScheduleSvc.sc
    console.log(schedule)

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

      if(element.description && element.startDate && element.dueDate && element.location && element.type)
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

}

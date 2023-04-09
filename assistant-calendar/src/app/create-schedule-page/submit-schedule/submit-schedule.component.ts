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
  scheduleName: string;
  generatedId: string | null = null;
  constructor(public dialog: MatDialog, private sendScheduleSvc: SendScheduleService,private http: HttpClient) {
    this.scheduleName = '';
  }
  openImportDialog(scheduleId: string) {
    this.dialog.open(GenerateScheduleIdComponent, {
      height: '350px',
      width: '483px',
      panelClass: 'dialogClass',
      data: { id: scheduleId },
    });
  }
  
  async generateUniqueId(): Promise<string> {
    const chars = '0123456789abcdef';
    let id = '';
    for (let i = 0; i < 24; i++) {
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
  
    let isUniqueId = false;
    while (!isUniqueId) {
      isUniqueId = !((await checkUniqueId(id)) ?? false);
      if (!isUniqueId) {
        for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * id.length);
          const newChar = chars[Math.floor(Math.random() * chars.length)];
          id = id.substring(0, randomIndex) + newChar + id.substring(randomIndex + 1);
        }
      }
    }
  
    return id;
  }
  
  
  isCreated = false;

  async createSchedule() {
    if (!this.generatedId) {
      const schedule = this.sendScheduleSvc.sc;

      // Generate a unique ID for the schedule
      const id = await this.generateUniqueId();
      this.generatedId = id; // Save the generated id
      const createdTime = new Date().toISOString();

      // Open the dialog with the generated schedule ID
      this.openImportDialog(id);

      // Send the schedule data to the server
      this.http.post('http://localhost:3000/schedule/create', { id, createdTime, schedule, scheduleName: this.scheduleName }).subscribe(
        (response) => {
          console.log('Schedule created successfully');
        },
        (error) => {
          console.log('Error creating schedule:', error);
        }
      );
    } else {
      // If the id is already generated, open the dialog with the same id
      this.openImportDialog(this.generatedId);
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

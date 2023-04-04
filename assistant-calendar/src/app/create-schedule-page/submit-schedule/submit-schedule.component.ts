import { Component } from '@angular/core';
import { GenerateScheduleIdComponent } from "./generate-schedule-id/generate-schedule-id.component";
import { MatDialog } from '@angular/material/dialog';
import { SendScheduleService } from '../send-schedule.service';
import { Deliverable } from '../create-schedule/deliverable';
import { HttpClient } from '@angular/common/http';
import { GetAllEventsService } from '../create-schedule/get-all-events.service';
@Component({
  selector: 'app-submit-schedule',
  templateUrl: './submit-schedule.component.html',
  styleUrls: ['./submit-schedule.component.css']
})
export class SubmitScheduleComponent {

 
  //to save the data from db
  public listOfDeliverables: Deliverable[] = [];

  
  createSchedule = async (newSchedule: Object) => {
    if(this.listOfDeliverables.length != 0){
    this.http.post("http://localhost:3000/schedule/create",newSchedule).subscribe(
      resp => {
      },
      err => {
        if (err.status === 422) {
          console.log(err.error);
        }
        else {
        }
      }
    )}} 

    resetSchedule(){
      this.listOfDeliverables=[];
      this.http.delete("http://localhost:3000/resetSchedule/").subscribe( 
        resp => {
      },
      err => {
        if (err.status === 422) {
          console.log(err.error);
        }
        else {
        }
      }
    )}


  constructor(public dialog: MatDialog, private sendScheduleSvc: SendScheduleService,private http: HttpClient,private _getAllEventsService:GetAllEventsService) { }
  openImportDialog() {
    this.dialog.open(GenerateScheduleIdComponent, { height: '350px', width: '483px', panelClass: 'dialogClass' });
   
    this.createSchedule({Event:this.listOfDeliverables});
    this.resetSchedule();
   
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
  ngOnInit(){
    this._getAllEventsService.getUsers().
    subscribe(data => this.listOfDeliverables = data);
   }
  

}

import { Component, Inject } from '@angular/core';
import { GenerateScheduleIdComponent } from "./generate-schedule-id/generate-schedule-id.component";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SendScheduleService } from '../send-schedule.service';
import { Deliverable } from '../create-schedule/deliverable';
import { HttpClient } from '@angular/common/http';
import { GetAllEventsService } from '../create-schedule/get-all-events.service';
import { tap } from 'rxjs';
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
  constructor(public dialog: MatDialog, private sendScheduleSvc: SendScheduleService,private http: HttpClient,private _getAllEventsService:GetAllEventsService) {
    this.scheduleName = '';
   }
  openImportDialog(scheduleId: string) {
    this.dialog.open(GenerateScheduleIdComponent, { height: '350px', width: '483px', panelClass: 'dialogClass' })
      this._getAllEventsService.getUsers().subscribe(data => {
        this.listOfDeliverables = data;
        this.createSchedule({Event:this.listOfDeliverables, id:  this.generateUniqueId(), createdTime:new Date().toISOString(), scheduleName: this.scheduleName });
        this.tempList = this.listOfDeliverables;
        this.resetSchedule();
      });
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
   //to save the data from db
   public listOfDeliverables: Deliverable[] = [];
   private tempList: Deliverable[] = [];
   
   createSchedule = async (newSchedule: Object) => {
    // Generate a unique ID for the schedule
    const id = await this.generateUniqueId();
    this.generatedId = id; // Save the generated id
    const createdTime = new Date().toISOString();
     if(this.listOfDeliverables.length != 0){
     this.http.post("http://localhost:3000/schedule/create",newSchedule).pipe(tap(()=>{ this._getAllEventsService.refreshRequired.next()})).subscribe(
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
   } 
 
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
     getAll(){
       this._getAllEventsService.getUsers().subscribe(data => this.listOfDeliverables = data);
      }
  
//need to make sure that some of the fields are not required 
//checks needed before creating the schedule otherwise ics will be corrupted{changes required}
  downloadIcs() {
    const schedule = this.tempList;
    console.log("schedule",schedule);

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

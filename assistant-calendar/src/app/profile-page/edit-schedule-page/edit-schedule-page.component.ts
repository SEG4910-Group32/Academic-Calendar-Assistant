import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deliverable } from 'src/app/create-schedule-page/create-schedule/deliverable';
import { Event } from 'src/app/shared/event.model';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { EditEventComponent } from './edit-event/edit-event/edit-event.component';

@Component({
  selector: 'app-edit-schedule-page',
  templateUrl: './edit-schedule-page.component.html',
  styleUrls: ['./edit-schedule-page.component.css']
})
export class EditSchedulePageComponent {

  Events: any;
  displayedColumns: string[] = ['name', 'type', 'end time', 'action'];
  private endpoint = 'https://academic-calendar-backend.onrender.com/api/schedules/id/'
  dataSource: any;
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  scheduleId = localStorage.getItem("scId")
  scheduleName = localStorage.getItem("scName")
  eve = localStorage.getItem("sc")
  //  console.log(eve)
  // if(eve && eve.events){
  //   console.log(eve.events)
  // }
  updatedEndpoint = this.endpoint + this.scheduleId
  eventIDs = []
 constructor(public dialog: MatDialog,private http: HttpClient) { 
   this.Events= this.http.post(this.updatedEndpoint, { token: localStorage.getItem("currUser") });// ['SEG3102', 'SEG3101'];
 
   this.Events.subscribe(
    (response:any) => {
     this.Events = response.schedule.events
     //this.eventIDs = this.Events["events"]
     //console.log("eeee",this.eventIDs)
    //  if (response && response.events) {
    //    // Extract the 'schedules' array from the JSON response
    //    this.EVENTSS = response;
    //  }
      console.log('POST request successful: this.Events', this.Events);
    },
    (error:any) => {
      console.error('POST request failed:', error);
    }
  );
   
   
 }
  
 openDialog() {
  this.dialog.open(EditEventComponent);
}
}

import { Component ,ChangeDetectionStrategy} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { Deliverable } from '../create-schedule-page/create-schedule/deliverable';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { DeleteScheduleComponent } from './delete-schedule/delete-schedule/delete-schedule.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  
})
export class ProfilePageComponent {
  //displayedColumns: string[] = ['Name', 'Id', 'Edit', 'Delete'];
  Schedules:  any;
  subsSchedules: any;
  dataOwns = [];
  dataSubs = [];
  private endpoint1 = 'https://academic-calendar-backend.onrender.com/api/schedules/user/owns'
  private endpoint2 = 'https://academic-calendar-backend.onrender.com/api/schedules/user/subscribed'
  
  dataSource: any;
   items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
   
  constructor(public dialog: MatDialog, private http: HttpClient) { 
    //this.Schedules= this.http.get<Deliverable[]>(this.endpoint);// ['SEG3102', 'SEG3101'];
    console.log(localStorage.getItem("currUser") )
    this.Schedules = this.http.post(this.endpoint1, { token: localStorage.getItem("currUser") });
    this.subsSchedules = this.http.post(this.endpoint2, { token: localStorage.getItem("currUser") });
    console.log("this.Schedules", this.Schedules);
    console.log("this.subsSchedules", this.subsSchedules);
    console.log(localStorage.getItem("currUser"), " localStorage.getItem(currUser)")
   this.Schedules.subscribe(
     (response:any) => {
      this.dataOwns = response
      if (response && response.schedules) {
        // Extract the 'schedules' array from the JSON response
        this.dataOwns = response.schedules;
      }
       console.log('POST request successful: this.dataOwns', this.dataOwns);
     },
     (error:any) => {
       console.error('POST request failed:', error);
     }
   );

   this.subsSchedules.subscribe(
    (response:any) => {
     this.dataSubs = response.schedule
     if (response && response.schedules) {
      // Extract the 'schedules' array from the JSON response
      this.dataSubs = response.schedules;
    }
      console.log('POST request successful: subs', this.dataSubs);
    },
    (error:any) => {
      console.error('POST request failed:', error);
    }
  );
  }
  
//unsubscribe schedule method
  unsubscribeFromSchedule(schedule:any ){
    console.log("unsubscribe from schedule called");
    const url = 'https://academic-calendar-backend.onrender.com/api/users/schedule/';
    ///schedule/:scheduleid/remove
    const token = localStorage.getItem("currUser");
    const id = schedule._id;
    const ubsubscribeUrl = url + id + "/remove"
    const options = {
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // body: {
        id: id,
        token: token,
      // },
    };
  
    this.http.patch(ubsubscribeUrl, options)
      .subscribe((response: any) => {
        // Handle the API response here
        console.log('Event deleted from the database:', response);
      });

  }
  editSchedule(sc: any){
    console.log("edit schedule")
    localStorage.setItem('scId', sc["_id"]);
    localStorage.setItem('scName', sc["name"]);
    localStorage.setItem('sc', sc);
    console.log("sc", sc)
 
  }

  openDialog(schedule: any) {
   
      console.log("schedule ", schedule);
      const dialogRef = this.dialog.open(DeleteScheduleComponent, {
        data: {
          name: schedule.name || '', // Add a null check here
          id : schedule._id
        
        }
      });
      const token = localStorage.getItem("currUser");
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
      // getting the updated event data from the dialog
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result) {
      //     const updatedEvent = {
      //       name: result.name || '',
      //       type: result.type || '',
      //       description: result.description || '',
      //       location: result.location || '',
      //       startTime: result.startTime || '',
      //       endTime: result.endTime || '',
      //       id: schedule._id,
      //       token: token
      //     };
  
      //     console.log('The dialog was closed, result: ', updatedEvent);
      //    // this.updateEvent(updatedEvent);
      //   }
      // });
    
  }
}

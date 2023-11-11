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
import { forkJoin } from 'rxjs';


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
   
  constructor(public dialog: MatDialog, private http: HttpClient) {}
  
//unsubscribe schedule method
  unsubscribeFromSchedule(schedule:any ){
    console.log("unsubscribe from schedule called");
    const url = 'https://academic-calendar-backend.onrender.com/api/users/schedule/';
    ///schedule/:scheduleid/remove
    const token = localStorage.getItem("currUser");
    const id = schedule._id;
    const ubsubscribeUrl = url + id + "/remove"
    const options = {
        id: id,
        token: token,
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
      });
    
  }

  
ngOnInit() {
  console.log(localStorage.getItem("currUser"));

  const schedulesRequest = this.http.post(this.endpoint1, { token: localStorage.getItem("currUser") });
  const subsSchedulesRequest = this.http.post(this.endpoint2, { token: localStorage.getItem("currUser") });

  forkJoin([schedulesRequest, subsSchedulesRequest]).subscribe(
    (responses: any[]) => {
      // responses[0] is the response from the first request
      // responses[1] is the response from the second request
      this.dataOwns = responses[0] && responses[0].schedules ? responses[0].schedules : [];
      this.dataSubs = responses[1] && responses[1].schedules ? responses[1].schedules : [];

      console.log('POST requests successful: this.dataOwns', this.dataOwns);
      console.log('POST requests successful: subs', this.dataSubs);
    },
    (error: any) => {
      console.error('POST requests failed:', error);
    }
  );
}

}

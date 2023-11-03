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
   
  constructor(private http: HttpClient) { 
    //this.Schedules= this.http.get<Deliverable[]>(this.endpoint);// ['SEG3102', 'SEG3101'];
    console.log(localStorage.getItem("currUser") )
    this.Schedules = this.http.post(this.endpoint1, { token: localStorage.getItem("currUser") });
    this.subsSchedules = this.http.post(this.endpoint2, { token: localStorage.getItem("currUser") });
    console.log("this.Schedules", this.Schedules);
    console.log("this.subsSchedules", this.subsSchedules);
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
      console.log('POST request successful:', this.dataSubs);
    },
    (error:any) => {
      console.error('POST request failed:', error);
    }
  );
  }
  

  // ngOnInit(): void{
  //   this.dataSource = this.Schedules;
  // }
 //Schedules: string[] = this.http.get<Deliverable[]>(this.endpoint);// ['SEG3102', 'SEG3101'];
}

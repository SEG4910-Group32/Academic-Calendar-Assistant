import { Component ,ChangeDetectionStrategy} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { DeleteScheduleComponent } from './delete-schedule/delete-schedule/delete-schedule.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ScheduleFacade } from '../Facades/schedule.facade';
import { UserFacade } from '../Facades/user.facade';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],

})
export class ProfilePageComponent {
 
  username = localStorage.getItem("username")
  
  //list of schedules owned by the user
  dataOwns = [];

  //list of schedules that the user has subscribed to
  dataSubs = [];



  //the purpose for items is for the list of schedules to be scrollable
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  constructor(public dialog: MatDialog, private http: HttpClient, private scheduleFacade: ScheduleFacade, private userFacade: UserFacade) {}

//unsubscribe schedule method
  unsubscribeFromSchedule(schedule:any ){
    console.log("unsubscribe from schedule called");

    console.log("schedule._id", schedule._id,`localStorage.getItem("currUser")`, localStorage.getItem("currUser"))
  // this.http.patch(ubsubscribeUrl, options)
    this.userFacade.removeSchedule(schedule._id as string, localStorage.getItem("currUser") as string)
    .subscribe((response: any) => {
        console.log('Event deleted from the database:', response);
        this.loadData();
      });


  }

  //sets some values in the local storage item for when the "edit schedule" button is clicked in the profile page
  editSchedule(sc: any){
    console.log("edit schedule")
    localStorage.setItem('scId', sc["_id"]);
    localStorage.setItem('scName', sc["name"]);
    localStorage.setItem('sc', sc);
    console.log("sc", sc)

  }

  //for opening the dialog for deleting owned schedules
  openDialog(schedule: any) {

      console.log("schedule ", schedule);

      //sends the schedule name and schedule id to the delete dialog component
      const dialogRef = this.dialog.open(DeleteScheduleComponent, {
        data: {
          name: schedule.name || '', // Add a null check here
          id : schedule._id

        }
      });
      // Subscribe to the scheduleDeleted event
    dialogRef.componentInstance.scheduleDeleted.subscribe(() => {
      // Call the loadData method after schedule deletion to retrive the schedules again without needing to refresh the page manually
      this.loadData();
    });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //after the dialog is closed, the data is refreshsed in case a schedule was deleted
        this.loadData();
      });

  }


ngOnInit() {
  console.log(localStorage.getItem("currUser"));

  this.loadData()
  this.updateUsername()
 
}

updateUsername(){
  this.userFacade.getUserById(localStorage.getItem('currUser') as string).subscribe(
    (user) => {

      //localStorage.setItem("username", this.username as string)
       this.username = user.username.toString();
      console.log('User Name:', this.username);
    },
    (error) => {
      console.error('Error fetching user details:', error);
    }
  );
}

//gets the list of owned/subscribed to schedules to be shown in the profile page
loadData(){
  //gets the list of schedules owned by the user
  const schedulesRequest =this.scheduleFacade.getOwnedSchedules(localStorage.getItem("currUser") as string);

  //gets the list of schedules that the user subscribed to
  const subsSchedulesRequest = this.scheduleFacade.getSubscribedSchedules(localStorage.getItem("currUser") as string );

  forkJoin([schedulesRequest, subsSchedulesRequest]).subscribe(
    (responses: any[]) => {
      // responses[0] is the response from the first request for getting owned schedules
      // responses[1] is the response from the second request for getting subscribed schedules
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

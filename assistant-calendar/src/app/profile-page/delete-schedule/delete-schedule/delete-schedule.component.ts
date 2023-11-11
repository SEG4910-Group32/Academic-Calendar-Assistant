import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { profile } from '../../edit-schedule-page.component';
import { ProfilePageComponent } from '../../profile-page.component';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-delete-schedule',
  templateUrl: './delete-schedule.component.html',
  styleUrls: ['./delete-schedule.component.css']
})
export class DeleteScheduleComponent {
  action?:string;
  local_data:any;
  scheduleName: string = ''; 
  constructor(
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {name:string, id:string},
  ) {}

  deleteSchedule(scName:any){
    console.log("scName: ",scName)
    console.log("data.name", this.data.name)
    console.log("this.data.id ",this.data.id)
    console.log("scName == this.data.name", scName == this.data.name)
    if(scName == this.data.name){
      this.deleteSched()
    }
    else{
      console.log("The name you entered is incorrect")
    }
  }

  //method used to delete an schedule
deleteSched() {
  const deleteUrl = 'https://academic-calendar-backend.onrender.com/api/schedules';
  const token = localStorage.getItem("currUser");
  const id = this.data.id;

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      id: this.data.id,
      token: token,
    },
  };

  this.http.delete(deleteUrl, options)
    .subscribe((response: any) => {
      // Handle the API response here
      console.log('Schedule deleted from the database:', response);
    });
}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { profile } from '../../edit-schedule-page.component';
import { ProfilePageComponent } from '../../profile-page.component';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
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
    private _snackBar: MatSnackBar
  ) {}

  deleteSchedule(scName:any):void{
    console.log("scName: ",scName)
    console.log("data.name", this.data.name)
    console.log("this.data.id ",this.data.id)
    console.log("scName == this.data.name", scName == this.data.name)
    if(scName == this.data.name){
      this.deleteSched();

      this.openSnackbar(`Schedule ${scName} deleted successfully`);
      //this._snackBar.open("Schedule delete succesfully");
    }
    else{
      console.log("The name you entered is incorrect")
      this.openSnackbar("Couldn't delete the schedule, please try again");
    }
  }


  openSnackbar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000, // Set the duration in milliseconds (e.g., 3000 for 3 seconds)
      panelClass: 'custom-snackbar',
    });
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

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}

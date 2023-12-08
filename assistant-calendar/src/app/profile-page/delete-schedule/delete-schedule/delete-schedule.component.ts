import { Component,EventEmitter,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { profile } from '../../edit-schedule-page.component';
import { ProfilePageComponent } from '../../profile-page.component';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ScheduleFacade } from 'src/app/Facades/schedule.facade';


@Component({
  selector: 'app-delete-schedule',
  templateUrl: './delete-schedule.component.html',
  styleUrls: ['./delete-schedule.component.css']
})
/**
 * This is a dialog that shows up on the page when user clicks on delete for one of their owned schedules
 * the dialog will ask the user to enter the schedule name exactly as shows to them(it's case sensitive)
 * if the schedule name is an exact match, the schedule will be deleted
 */

export class DeleteScheduleComponent {
  action?:string;
  local_data:any;
  scheduleName: string = ''; 
  constructor(
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {name:string, id:string},
    private _snackBar: MatSnackBar,
    private scheduleFacade: ScheduleFacade
  ) {}
  deletedVerification = false;
// Create an event emitter
scheduleDeleted: EventEmitter<void> = new EventEmitter<void>();
  //deletes the schedule if the schedule name entered by the user is the same as schedule name(case sensitive)
  deleteSchedule(scName:any):void{
    
    if(scName == this.data.name){
      this.deleteSched();

      if(this.deletedVerification){
         //snackbar shows a message if the delete request was succesful
        this.openSnackbar(`Schedule ${scName} deleted successfully`);
        //this._snackBar.open("Schedule delete succesfully");
        this.deletedVerification = false;
      }
     
    }
    else{
      //if the user entered the wrong name, they will get a message indicating the schedule didn't get deleted
      this.openSnackbar("Couldn't delete the schedule, please try again");
    }
  }


  //opens the snackbar on the bottom of the page to confirm/deny schedule deletion
  openSnackbar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000, 
      panelClass: 'custom-snackbar',
    });
  }

//method used to delete an schedule, called when user clicks on delete in the dialog, the method sends the delete requst to the db
deleteSched() {
  
  console.log("this.data.id",this.data.id)
  const id = this.data.id
  //calls the delete schedule function in the schedule facade
  this.scheduleFacade.deleteSchedule( localStorage.getItem("currUser") as string, id as string)
    .subscribe((response: any) => {
      console.log('Schedule deleted from the database:', response);
      this.deletedVerification = true
      // Emit the event after successful deletion
      this.scheduleDeleted.emit();
    });
}
  //used for closing the dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  //when the snackbar is opened it shows the message string
  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}

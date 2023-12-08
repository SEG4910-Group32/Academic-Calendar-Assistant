import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { EditSchedulePageComponent } from '../../edit-schedule-page.component';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})

/**we created this component for the add event dialog in the edit schedule page
 * the user needs to fill the required fileds which are the name, type and due date 
 * then they will be able  to create a new event
 * after clicking on add, the event data will be sent back to the edit-schedule page to be added to the db
 */
export class AddEventComponent {
 // dialogRef: any;

 newEvent:any ={
  name:"",
  type:"",
  location:"",
  startDate:"",
  dueDate:"",
  description:"",

 }
  eventFacade: any;
  constructor(
    public dialogRef: MatDialogRef<EditSchedulePageComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {name:string, type:string, dueDate:string, startDate:string, location:string, description:string}, 
    //{token:string, schedule:string,type:string, dueDate:string, startDate:string, location:string, description:string},
  
 
  ) {}

  addEvent(){
   // this.eventFacade.addEvent(this.newEvent);
  }

  onNoClick(): void {
    console.log("this.data",this.newEvent)
    this.dialogRef.close();
  }
}

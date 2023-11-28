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

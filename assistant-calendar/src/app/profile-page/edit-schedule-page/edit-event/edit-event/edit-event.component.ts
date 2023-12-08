import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditSchedulePageComponent } from '../../edit-schedule-page.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})

/**
 * We created this component for the edit event dialog
 * the dialog shows the current data for the event, and the user can edit the fileds that they want and save the changes
 * when the update button is clicked the data is sent back to the edit-event page to be sent to the database(using the event facade)
 */
export class EditEventComponent {
  action?:string;
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<EditSchedulePageComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {name:string, type:string, description:string, location:string, startTime:string, endTime:string},
  ) {}

  //for closing the dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
}


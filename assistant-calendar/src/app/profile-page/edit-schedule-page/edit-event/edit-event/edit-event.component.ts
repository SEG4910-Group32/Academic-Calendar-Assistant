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


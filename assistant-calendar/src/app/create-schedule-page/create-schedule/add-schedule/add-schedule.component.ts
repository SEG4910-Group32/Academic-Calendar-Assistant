import { Component, Inject, Optional } from '@angular/core';
import { Deliverable } from '../deliverable';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateScheduleComponent } from '../create-schedule.component';
import { mockSchedules } from '../mock-schedules';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent {

  action?:string;
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<CreateScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {type:string, dueDate:string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
 
}

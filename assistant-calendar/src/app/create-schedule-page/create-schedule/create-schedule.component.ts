import { Component, ViewChild , Inject} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { Deliverable } from './deliverable';
import { mockSchedules } from './mock-schedules';



@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent {
  type: string | undefined;
  dueDate: string | undefined;

  tmpType: string| undefined;
  tmpDueDate: string| undefined;
  deliverables = mockSchedules;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddScheduleComponent, {

     height: '300px',
     width: '500px',

      data: {task: this.type, dueDate: this.dueDate},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.type = result.type;
      this.dueDate = result.dueDate;
      mockSchedules.push({type:result.type , dueDate:result.dueDate})
    });
    
  }
}



import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateScheduleComponent } from '../create-schedule.component';
import { HttpClient  } from '@angular/common/http';
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent {

  action?:string;constructor(
    public dialogRef: MatDialogRef<CreateScheduleComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {type:string, dueDate:string, startDate:string, location:string, description:string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}

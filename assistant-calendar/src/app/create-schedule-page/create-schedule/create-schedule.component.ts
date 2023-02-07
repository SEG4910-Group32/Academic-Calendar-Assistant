import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { Deliverable } from './deliverable';
import { mockSchedules } from './mock-schedules';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent {
  deliverables = mockSchedules;
 
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddScheduleComponent, {
      height: '200px',
      width: '400px',
    });
  }
}

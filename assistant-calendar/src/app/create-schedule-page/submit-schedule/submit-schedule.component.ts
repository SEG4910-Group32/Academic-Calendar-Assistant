import { Component } from '@angular/core';
import {GenerateScheduleIdComponent} from "./generate-schedule-id/generate-schedule-id.component";
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-submit-schedule',
  templateUrl: './submit-schedule.component.html',
  styleUrls: ['./submit-schedule.component.css']
})
export class SubmitScheduleComponent {
  constructor(public dialog: MatDialog) {}
  openImportDialog() {
    this.dialog.open(GenerateScheduleIdComponent, {height: '350px',width: '483px', panelClass: 'dialogClass'});
  }

}

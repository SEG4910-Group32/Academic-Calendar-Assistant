import { Component } from '@angular/core';
import {ImportSyllabusComponent} from "./import-syllabus/import-syllabus.component";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-import-schedule',
  templateUrl: './import-schedule.component.html',
  styleUrls: ['./import-schedule.component.css']
})
export class ImportScheduleComponent {

  constructor(public dialog: MatDialog) {}

  openImportDialog() {
    this.dialog.open(ImportSyllabusComponent);
  }
}

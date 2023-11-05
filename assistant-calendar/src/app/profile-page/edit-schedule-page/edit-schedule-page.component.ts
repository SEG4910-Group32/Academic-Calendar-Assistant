import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-edit-schedule-page',
  templateUrl: './edit-schedule-page.component.html',
  styleUrls: ['./edit-schedule-page.component.css']
})
export class EditSchedulePageComponent {

  displayedColumns: string[] = ['name', 'type', 'end time', 'action'];

}

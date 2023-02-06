import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent {
  deliverable1 = new FormControl('');
  deliverable2 = new FormControl('');
  deliverable3 = new FormControl('');
  deliverable1Date = new FormControl('');
  deliverable2Date = new FormControl('');
  deliverable13Date = new FormControl('');
}

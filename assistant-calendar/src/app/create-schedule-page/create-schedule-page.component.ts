import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-create-schedule-page',
  templateUrl: './create-schedule-page.component.html',
  styleUrls: ['./create-schedule-page.component.css'],
  animations: [
    // animation triggers go here
  ]
})
export class CreateSchedulePageComponent {

  public currentContainer = 0;

  public changeContainer(delta: number): void {
    this.currentContainer += delta;
  }
}

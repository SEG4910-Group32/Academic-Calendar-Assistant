import { Component } from '@angular/core';

@Component({
  selector: 'app-create-schedule-page',
  templateUrl: './create-schedule-page.component.html',
  styleUrls: ['./create-schedule-page.component.css']
})
export class CreateSchedulePageComponent {

  public currentContainer = 0;

  public changeContainer(delta: number): void {
    this.currentContainer += delta;
  }
}

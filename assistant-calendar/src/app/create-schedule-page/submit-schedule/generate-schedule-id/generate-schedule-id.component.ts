import { Component } from '@angular/core';
import { Clipboard } from "@angular/cdk/clipboard"
@Component({
  selector: 'app-generate-schedule-id',
  templateUrl: './generate-schedule-id.component.html',
  styleUrls: ['./generate-schedule-id.component.css']
})
export class GenerateScheduleIdComponent {
  value = "Hello world";
  code: string;
  constructor(private clipboard: Clipboard) {
    const id = 'xxxxxxxxyxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    this.code = id;
  }

}

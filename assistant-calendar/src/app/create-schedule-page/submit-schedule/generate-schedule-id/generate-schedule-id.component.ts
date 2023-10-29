import { Component, Inject } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-generate-schedule-id',
  templateUrl: './generate-schedule-id.component.html',
  styleUrls: ['./generate-schedule-id.component.css']
})
export class GenerateScheduleIdComponent {
  code: string;
  constructor(private clipboard: Clipboard) {
    const id = 'xxxxxxxxyxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 24 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(24);
    });
    this.code = id;
  }
  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: { id: string },
  //   private clipboard: Clipboard
  // ) {
  //   this.code = data.id;
  // }
}

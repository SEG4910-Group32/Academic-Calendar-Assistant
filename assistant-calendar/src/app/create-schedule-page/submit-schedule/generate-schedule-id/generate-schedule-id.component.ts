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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { generatedId: string },
    private clipboard: Clipboard
  ) {
    this.code = data.generatedId;
  }

  copyToClipboard(): void {
    this.clipboard.copy(this.code);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { SyllabusService } from '../../../../services/syllabus.service';
import {Event} from "../../../Models/event.model";
import {CurrentEventsService} from "../../../../services/current-events.service";

@Component({
  selector: 'app-import-syllabus',
  templateUrl: './import-syllabus.component.html',
  styleUrls: ['./import-syllabus.component.css'],
})
export class ImportSyllabusComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  public data: Array<any> = [];
  private units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  public listOfDeliverables: Event[] = [];

  constructor(private currentEventsSvc: CurrentEventsService, private syllabusService: SyllabusService) {}

  ngOnInit() {
    this.syllabusService.syllabusData$.subscribe(data => {
    });
  }

  fileUploadHandler(files: NgxFileDropEntry[]): void {
    this.files = files;
    const reader = new FileReader();
    let index = 0;

    for (const droppedFile of files) {
      // check if the entry is a file or not
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          let modifiedDate = file.lastModified.toLocaleString();
          this.data.push({ name: this.files[index].relativePath, size: this.transform(file.size), modified: modifiedDate });
          this.uploadPdf(file);

          index++;
        });
      } else {
        // if the entry is a directory add only files
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  transform(bytes: number = 0, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';

    let unit = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }

    return bytes.toFixed(+precision) + ' ' + this.units[unit];
  }

  removeFile(file: NgxFileDropEntry): void {
    this.data.forEach((element, index) => {
      if (element == file) this.data.splice(index, 1);
    });
    console.log(this.data.length);
  }

  formatDateAndAddYear(date: string): string {
    if (!date) {
      return '';
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const [month, day] = date.split('-') || [];

    if (month && day) {
      const formattedDate = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10));
      const formattedDateString = `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;

      return formattedDateString;
    } else {
      return '';
    }
  }

  private uploadPdf(file: File): void {
    this.syllabusService.uploadPdfAndFetchData(file).subscribe(
      (response) => {
        console.log('Upload and fetch successful! Response:', response);

        const deadlines = response.deadlines as any[];

        // Map each item in "deadlines" to an Event object
        this.listOfDeliverables = deadlines.map((deadline) => ({
          type: deadline.type,
          name: deadline.type || '',
          description: deadline.sentence,
          endTime: this.formatDateAndAddYear(deadline.date) || '',
        } as Event));
        console.log(this.listOfDeliverables);
        this.currentEventsSvc.updateEventList(this.listOfDeliverables);
      },
      (error) => {
        console.error('Error uploading PDF:', error);
      }
    );
  }
}

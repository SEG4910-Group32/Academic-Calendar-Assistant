import { Component } from '@angular/core';
import { NgxFileDropEntry } from "ngx-file-drop";

@Component({
  selector: 'app-import-syllabus',
  templateUrl: './import-syllabus.component.html',
  styleUrls: ['./import-syllabus.component.css']
})

export class ImportSyllabusComponent {

  public files: NgxFileDropEntry[] = [];
  public data: Array<any> = [];
  private units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  fileUploadHandler(files:NgxFileDropEntry[]){
    // need to implement handler once back-end is set-up
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

    return bytes.toFixed(+ precision) + ' ' + this.units[unit];
  }
}

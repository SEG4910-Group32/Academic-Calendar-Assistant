import { Component, ViewChild , Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { Deliverable } from './deliverable';
import { mockSchedules } from './mock-schedules';
import {MatAccordion} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent {

  showFiller = false;

  // drop(event: CdkDragDrop<Deliverable[]>) {
  //   moveItemInArray(this.deliverables, event.previousIndex, event.currentIndex);
  // }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  type?: string ;
  dueDate?: string;

  panelOpenState = false;

  deliverables = mockSchedules;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
     data: {task: this.type, dueDate: this.dueDate},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.type = result.type;
      this.dueDate = result.dueDate;
      mockSchedules.push({type:result.type , dueDate:result.dueDate, startDate: result.startDate,location: result.location,description: result.description });
      console.log("result.type",result.type);
      console.log(mockSchedules);
    });
    
  }

  January = ['Assignment 1'];
  February = ['Assignment 2'];
  March = ['Assignment 3'];
  April = ['Assignment 4'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    // console.log(this.done);
    // console.log(this.todo);
    
  }
}



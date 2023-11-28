import { Component, ViewChild , OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { MatAccordion } from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
import { CurrentEventsService } from 'src/services/current-events.service';
import { Event } from 'src/app/Models/event.model';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit{

  createNewDeliverableForm = new FormGroup({
    adeliverable: new FormControl(),
    adescription: new FormControl(),
    alocation: new FormControl()
  });

  showFiller = false;

  public listOfDeliverables: Event[] = [];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  type?: string ;
  dueDate?: string;

  panelOpenState = false;

  constructor(public dialog: MatDialog, private http: HttpClient, private currentEventsSvc: CurrentEventsService) {
    this.currentEventsSvc.eventList$.subscribe((events) => {
      this.listOfDeliverables = events;
      currentEventsSvc.eventList = this.listOfDeliverables;
  })
  }

  ngOnInit(){
    this.getAll();
  }

  createEvent = async (newEvent: Event) => {
    this.currentEventsSvc.eventList.push(newEvent);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
     data: {task: this.type, dueDate: this.dueDate},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createEvent({
        name: result.type,
        schedule:"" ,
        type:result.type,
        endTime:result.dueDate,
        startTime: result.startDate,
        location: result.location,
        description: result.description
      });
    });

  }

  update = async (event: Event, i: number) => {
    this.currentEventsSvc.eventList[i]=event;
    this.listOfDeliverables = this.currentEventsSvc.eventList;
  }

  delete = async (event: Object, index: number) => {
    this.currentEventsSvc.eventList = this.currentEventsSvc.eventList.filter((v,i)=> i !== index);
    this.listOfDeliverables = this.currentEventsSvc.eventList;
  };

  getAll(){
    this.listOfDeliverables = this.currentEventsSvc.eventList;
  }

}

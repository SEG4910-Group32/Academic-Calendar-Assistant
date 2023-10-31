import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deliverable } from 'src/app/create-schedule-page/create-schedule/deliverable';
import { Event } from 'src/app/shared/event.model';
@Component({
  selector: 'app-edit-schedule-page',
  templateUrl: './edit-schedule-page.component.html',
  styleUrls: ['./edit-schedule-page.component.css']
})
export class EditSchedulePageComponent {

  Events: Observable<Event[]>;
  displayedColumns: string[] = ['name', 'type', 'end time', 'action'];
  private endpoint = 'https://academic-calendar-backend.onrender.com/api/Events/'
  dataSource: any;
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
 constructor(private http: HttpClient) { 
   this.Events= this.http.get<Event[]>(this.endpoint);// ['SEG3102', 'SEG3101'];
 
 }
 
}

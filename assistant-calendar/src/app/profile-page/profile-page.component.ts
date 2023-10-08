import { Component } from '@angular/core';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { Deliverable } from '../create-schedule-page/create-schedule/deliverable';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  
})
export class ProfilePageComponent {
  Schedules: Observable<Deliverable[]>;
  private endpoint = 'http://localhost:3000/api/schedules/';

  constructor(private http: HttpClient) { 
    this.Schedules= this.http.get<Deliverable[]>(this.endpoint);// ['SEG3102', 'SEG3101'];
  
  }

  
 //Schedules: string[] = this.http.get<Deliverable[]>(this.endpoint);// ['SEG3102', 'SEG3101'];
}

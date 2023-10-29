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
  // private endpoint = '"https://academic-calendar-backend.onrender.com/api/schedules/';
  //private endpoint = 'https://academic-calendar-backend.onrender.com/api/owner/65175b6ec4cfd5b8effe44ee';
  private endpoint = 'https://academic-calendar-backend.onrender.com/api/schedules/owner/651e3c7ed23a153e3fdce497'
  constructor(private http: HttpClient) { 
    this.Schedules= this.http.get<Deliverable[]>(this.endpoint);// ['SEG3102', 'SEG3101'];
  
  }

  
 //Schedules: string[] = this.http.get<Deliverable[]>(this.endpoint);// ['SEG3102', 'SEG3101'];
}

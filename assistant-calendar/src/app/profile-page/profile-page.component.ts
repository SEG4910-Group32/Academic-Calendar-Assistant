import { Component ,ChangeDetectionStrategy} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { Deliverable } from '../create-schedule-page/create-schedule/deliverable';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  
})
export class ProfilePageComponent {
  displayedColumns: string[] = ['Name', 'Id', 'Edit', 'Delete'];
  Schedules: Observable<Deliverable[]>;
  // private endpoint = '"https://academic-calendar-backend.onrender.com/api/schedules/';
  //private endpoint = 'https://academic-calendar-backend.onrender.com/api/owner/65175b6ec4cfd5b8effe44ee';
  private endpoint = 'https://academic-calendar-backend.onrender.com/api/schedules/'
   dataSource: any;
   items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  constructor(private http: HttpClient) { 
    this.Schedules= this.http.get<Deliverable[]>(this.endpoint);// ['SEG3102', 'SEG3101'];
  
  }
  

  // ngOnInit(): void{
  //   this.dataSource = this.Schedules;
  // }
 //Schedules: string[] = this.http.get<Deliverable[]>(this.endpoint);// ['SEG3102', 'SEG3101'];
}

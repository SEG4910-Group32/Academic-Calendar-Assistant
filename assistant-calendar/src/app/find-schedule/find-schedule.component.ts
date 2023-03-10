import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-find-schedule',
  templateUrl: './find-schedule.component.html',
  styleUrls: ['./find-schedule.component.css']
})
export class FindScheduleComponent {

search!: String;
searchValues = ["001","002","003"];

searchID() {
  if (this.searchValues.includes(this.search.toString())){
    alert("Schedule found!");
  }else{
    alert("Schedule NOT found");
  }
  }

}

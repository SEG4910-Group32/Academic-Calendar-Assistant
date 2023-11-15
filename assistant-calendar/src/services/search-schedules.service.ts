import { Injectable } from '@angular/core';
import { Schedule } from 'src/app/Models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class SearchSchedulesService {

  scheduleList :Array<Schedule>

  constructor() {
    this.scheduleList = new Array<Schedule>();
   }
}

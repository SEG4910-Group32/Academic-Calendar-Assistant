import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ScheduleFacade } from '../Facades/schedule.facade';
import { SearchSchedulesService } from 'src/services/search-schedules.service';
import { Schedule } from '../Models/schedule.model';

@Component({
  selector: 'app-find-schedule',
  templateUrl: './find-schedule.component.html',
  styleUrls: ['./find-schedule.component.css']
})
export class FindScheduleComponent {
  scheduleIdForm = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(24), Validators.maxLength(24),
    Validators.pattern('[0-9a-fA-F]*')]]
  });

  doesScheduleExist: boolean = true; // boolean keeping track of if a schedule with the id provided exists
  scheduleList: Schedule[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private scheduleFacadesvc: ScheduleFacade,
    private searchSchedulesvc: SearchSchedulesService
  ) { }

  /**
     * Function which checks if a schedule with the provided id exists and navigates to subscribe to schedule
     * if it does
     * @param id 24 length hexadecimal id corresponding to a schedule
     */
  scheduleExists = async (id: string) => {
    return this.scheduleFacadesvc.getScheduleById(id).subscribe(exists => {
      if (exists) {
        this.doesScheduleExist = true;
        console.log("doc exists!!!!!!!!!!!!!!!!!!!");
        console.log(exists);
        this.searchSchedulesvc.scheduleList = [];
        this.searchSchedulesvc.scheduleList.push(new Schedule(exists.schedule))
        this.scheduleList = this.searchSchedulesvc.scheduleList
        console.log(this.scheduleList);
        this.router.navigate(['/subscribe-schedule'])
        

        // this.router.navigate(['/subscribe-schedule'], { queryParams: { id: id } });
      }
      else {
        console.log("doc does not exist");
        console.log(exists);
        

        this.doesScheduleExist = false;
      }

    }, err => {
      console.log(err);
    });
  };

  /**
   * Function which checks if schedule exists if the form has no errors
   */
  search(): void {
    let id = this.scheduleIdForm.controls.id.value;
    let invalid = this.scheduleIdForm.controls.id.errors;

    if (id && !invalid) {
      this.scheduleExists(id);
    }
  }
}

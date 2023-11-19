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
    id: ['']
  });

  doesScheduleExist: boolean = true; // boolean keeping track of if a schedule with the id provided exists
  scheduleList: Schedule[] = [];
  selected: String = "Schedule ID";
  searched: boolean = false;


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
    this.searchSchedulesvc.scheduleList = [];
    if (this.selected == "Schedule ID") {
      this.scheduleFacadesvc.getScheduleById(id, localStorage.getItem("currUser") as string).subscribe(exists => {
        if (exists) {
          this.doesScheduleExist = true;
          console.log("doc exists!!!!!!!!!!!!!!!!!!!");
          console.log(exists);

          this.searchSchedulesvc.scheduleList.push(new Schedule(exists.schedule))

          // this.router.navigate(['/subscribe-schedule'])


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
    } else if (this.selected == "Owner ID") {
      this.scheduleFacadesvc.getScheduleByOwner(id).subscribe(exists => {
        if (exists) {
          console.log("owned schedules are:");
          console.log(exists);
          exists.schedules.forEach((sched: any) => {
            this.searchSchedulesvc.scheduleList.push(new Schedule(sched))
          });


        }
        else {
          console.log("owned doc does not exist");
          console.log(exists);


          this.doesScheduleExist = false;
        }

      }, err => {
        console.log(err);
      });
    }
    else if (this.selected == "Schedule Name") {
      this.scheduleFacadesvc.getScheduleByName(id).subscribe(exists => {
        if (exists) {
          console.log("named schedules are:");
          console.log(exists);
          exists.schedules.forEach((sched: any) => {
            this.searchSchedulesvc.scheduleList.push(new Schedule(sched))
          });
          // this.router.navigate(['/subscribe-schedule'])
        }
        else {
          console.log("named doc does not exist");
          console.log(exists);


          this.doesScheduleExist = false;
          // this.router.navigate(['/subscribe-schedule'])
        }

      }, err => {
        console.log(err);
        // this.router.navigate(['/subscribe-schedule'])
      });
    }






    this.scheduleList = this.searchSchedulesvc.scheduleList
    if(this.scheduleList.length == 0){
      this.doesScheduleExist = false
    }
    else{
      this.doesScheduleExist = true
    }
    console.log("The Schedule list is: ");

    console.log(this.scheduleList);

  };

  /**
   * Function which checks if schedule exists if the form has no errors
   */
  search(): void {
    let id = this.scheduleIdForm.controls.id.value;
    let invalid = this.scheduleIdForm.controls.id.errors;
    this.searched = true

    if (id && !invalid) {
      this.scheduleExists(id);
    }
  }
}

import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscribe-to-schedule',
  templateUrl: './subscribe-to-schedule.component.html',
  styleUrls: ['./subscribe-to-schedule.component.css']
})
export class SubscribeToScheduleComponent {

  scheduleId: string = "";
  events: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Function which retrieves events corresponding to schedule id and displays them
   * in a table
   * @param id 24 length hexadecimal id corresponding to a schedule
   */
  getSchedule = async (id: string) => {
    this.http.get("http://localhost:3000/schedule/" + id).subscribe(res => {

      // retrieves events and sorts them chronologically
      this.events = Object(res).Event.sort((x: any, y: any) => {
        if (x.dueDate > y.dueDate) return 1;
        if (x.dueDate < y.dueDate) return -1;
        return 0;
      });

    }, err => {
      console.log("error");
    });
  };

  /**
   * Checks route for schedule id
   */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.scheduleId = params['id'];
    });

    this.getSchedule(this.scheduleId);
  }

}

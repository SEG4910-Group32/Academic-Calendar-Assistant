import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  getSchedule = async (id: string) => {
    this.http.get("http://localhost:3000/schedule/" + id).subscribe(res => {
      console.log(res);
      this.events = Object(res).Event;
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

    console.log(this.scheduleId);

    this.getSchedule(this.scheduleId);
  }
  
}

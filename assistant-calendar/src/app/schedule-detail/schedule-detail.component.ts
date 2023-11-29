// schedule-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from 'src/app/Models/schedule.model';
import { ScheduleFacade } from '../Facades/schedule.facade';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  scheduleId: string | undefined;
  schedule: Schedule | undefined;
  isSubscribed: boolean;
  selectedTask: any;
  activeTab: string;
  eventFacade: any;
  events: any;

  getEventName(eventId: string): string {
    const event = this.events.find((e: any) => e === eventId);
    return event ? event.name : 'Event Not Found';
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleFacade: ScheduleFacade
  ) {
    this.isSubscribed = false;
    this.activeTab = 'Details';
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const scheduleId = params.get('id');
      if (scheduleId) {
        this.scheduleFacade.getScheduleById(scheduleId, localStorage.getItem("currUser") as string)
          .subscribe((schedule) => {
            console.log('Received Schedule:', schedule);
  
            if (schedule) {
              // Log the entire schedule object
              console.log('Schedule Object:', schedule);
  
              this.schedule = new Schedule(schedule.schedule);
              this.checkSubscription();
  
              // Fetch events for the schedule
              if (this.schedule.events) {
                this.eventFacade.getEventBySchedule(scheduleId)
                  .subscribe((events : Event[]) => {
                    this.events = events;
                    console.log('Fetched Events:', this.events);
                  });
              }
            } else {
              console.error(`Schedule with ID ${scheduleId} not found.`);
            }
          });
      } else {
        console.error('No schedule ID provided.');
      }
    });
  
    // Update the activeTab based on route query parameter
    this.route.queryParams.subscribe((params) => {
      this.activeTab = params['tab'] || 'Details';
    });
  }

  checkSubscription() {
    const currentUserString = localStorage.getItem('currUser');
    if (currentUserString && this.schedule) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser.subscribedSchedules) {
        this.isSubscribed = currentUser.subscribedSchedules.includes(this.schedule.id || '');
      }
    }
  }

  subscribe() {
    const currentUserString = localStorage.getItem('currUser');
    if (currentUserString && this.schedule) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser.subscribedSchedules && this.schedule.id) {
        currentUser.subscribedSchedules.push(this.schedule.id);
        localStorage.setItem('currUser', JSON.stringify(currentUser));
        this.isSubscribed = true;
      }
    }
  }

  unsubscribe() {
    const currentUserString = localStorage.getItem('currUser');
    if (currentUserString && this.schedule && this.schedule.id) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser.subscribedSchedules) {
        currentUser.subscribedSchedules = currentUser.subscribedSchedules.filter((id: string) => id !== this.schedule?.id);
        localStorage.setItem('currUser', JSON.stringify(currentUser));
        this.isSubscribed = false;
      }
    }
  }

  downloadICS() {
    // Implement the logic to download the ICS file
  }

  showTaskDetails(task: any) {
    this.selectedTask = task;
  }

  closeTaskDetails() {
    this.selectedTask = null;
  }

  goToFindSchedule() {
    this.router.navigate(['/find-schedule']);
  }

  openTab(tabName: string) {
    this.activeTab = tabName;
  }
}

// schedule-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from 'src/app/Models/schedule.model';
import { ScheduleFacade } from '../Facades/schedule.facade';
import { EventFacade } from '../Facades/event.facade';
import { UserFacade } from '../Facades/user.facade';
import { Event } from 'src/app/Models/event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  scheduleId: string | undefined;
  schedule: Schedule | undefined;
  events: Event[] | undefined;
  isSubscribed: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleFacade: ScheduleFacade,
    private eventFacade: EventFacade,
    private userFacade: UserFacade,
    
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const scheduleId = params.get('id');
      if (scheduleId) {
        this.scheduleFacade.getScheduleById(scheduleId, localStorage.getItem("currUser") as string)
          .subscribe((schedule) => {
            if (schedule) {
              this.schedule = new Schedule(schedule.schedule);

              // Fetch events for the schedule
              this.fetchEvents(scheduleId);

              // Check if the user is subscribed and initialize isSubscribed
              this.checkSubscription(localStorage.getItem("currUser") as string);
            } else {
              console.error(`Schedule with ID ${scheduleId} not found.`);
            }
          });
      } else {
        console.error('No schedule ID provided.');
      }
    });
  }

  fetchEvents(scheduleId: string) {
    this.eventFacade.getEventBySchedule(scheduleId)
      .subscribe(
        (events: Event[]) => {
          this.events = events.map(event => new Event(event));
          console.log('Fetched Events:', this.events);
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
  }

  checkSubscription(token: string): void {
    this.scheduleFacade.getSubscribedSchedules(token)
      .subscribe(
        (schedules: any) => {
          const isSubscribed = schedules.schedules.some((schedule: any) => schedule._id === this.schedule?.id);
          this.isSubscribed = isSubscribed;
        },
        (error) => {
          console.error('Subscription check error:', error);
        }
      );
  }

  subscribe() {
    const scheduleId = this.schedule?.id;
    const token = localStorage.getItem("currUser") as string;

    if (scheduleId) {
      this.userFacade.addSchedule(scheduleId, token, '')
        .subscribe(
          () => {
            console.log('Subscribed successfully!');
            // Update UI state
            this.isSubscribed = true;
          },
          (error) => {
            console.error('Subscription error:', error);
          }
        );
    }
  }

  unsubscribe() {
    const scheduleId = this.schedule?.id;
    const token = localStorage.getItem("currUser") as string;

    if (scheduleId) {
      this.userFacade.removeSchedule(scheduleId, token)
        .subscribe(
          () => {
            console.log('Unsubscribed successfully!');
            // Update UI state
            this.isSubscribed = false;
          },
          (error) => {
            console.error('Unsubscription error:', error);
          }
        );
    }
  }

  downloadICS() {
    // Fetch events again to ensure they are up-to-date
    this.fetchEvents(this.scheduleId as string);
// use console log to check list of events see if its compatible 
//maybe json (works with set time out)
    setTimeout(() => {
      const calendarData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0'
      ];

      if (this.events && this.events.length > 0) {
        this.events.forEach((element: Event) => {
          if (element.endTime && element.type) {
            calendarData.push(
              'BEGIN:VEVENT',
              element.description ? 'DESCRIPTION:' + element.description : '',
              element.startTime ? 'DTSTART:' + new Date(element.startTime).toISOString() : '',
              'DTEND:' + new Date(element.endTime).toISOString(),
              element.location ? 'LOCATION:' + element.location : '',
              'SUMMARY:' + element.type,
              'TRANSP:TRANSPARENT',
              'END:VEVENT'
            );
          }
        });
      }

      calendarData.push(
        'END:VCALENDAR'
      );

      console.log('Calendar Data:', calendarData.join('\n'));
      const blob = new Blob([calendarData.join('\n')], { type: 'text/calendar' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'schedule.ics');
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }, 500); // Adjust the delay time as needed
  }

  goToFindSchedule() {
    this.router.navigate(['/find-schedule']);
  }
}

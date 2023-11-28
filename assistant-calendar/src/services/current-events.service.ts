import { Event } from 'src/app/Models/event.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentEventsService {
  private eventListSubject = new BehaviorSubject<Event[]>([]);
  public eventList$: Observable<Event[]> = this.eventListSubject.asObservable();

  constructor() {
    this.eventList = new Array<Event>();
  }

  get eventList(): Event[] {
    return this.eventListSubject.getValue();
  }

  set eventList(value: Event[]) {
    this.eventListSubject.next(value);
  }

  updateEventList(updatedList: Event[]): void {
    this.eventList = updatedList;
  }
}


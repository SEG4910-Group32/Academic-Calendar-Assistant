import { Injectable } from '@angular/core';
import { Event } from '../shared/event.model';
import { Deliverable } from './create-schedule/deliverable';

@Injectable({
  providedIn: 'root'
})
export class SendScheduleService {

  constructor() { }
  public sc = new Array<Deliverable>;
}

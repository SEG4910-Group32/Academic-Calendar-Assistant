import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../Models/schedule.model';
import { ScheduleRepository } from '../Repositories/schedule.repository';
import { ScheduleFacadeInterface } from './interfaces/scheduleFacade.interface';
import { Event } from '../Models/event.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleFacade implements ScheduleFacadeInterface {
  constructor(private scheduleRepository: ScheduleRepository) {}

  // Define methods to interact with the repository
  getSchedules(): Observable<Schedule[]> {
    return this.scheduleRepository.getAllSchedules();
  }

  getScheduleById(id: string, token:string): Observable<any> {
    return this.scheduleRepository.getScheduleById(id,token);
  }

  createSchedule(schedule: Schedule):Observable<any> {
    return this.scheduleRepository.createSchedule(schedule)
  }

  createEvents(body: { id: string | undefined; events: Event[]; }, scheduleId: string, token:string): Observable<any> {
    return this.scheduleRepository.createEvents(body, scheduleId, token);
  }
  updateSchedule(schedule: Schedule, scheduleId: string, token:string): Observable<Schedule> {
    return this.scheduleRepository.updateSchedule(schedule, scheduleId,token);
  }

  deleteSchedule(id: string, token:string): Observable<void> {
    return this.scheduleRepository.deleteSchedule(id,token);
  }


  getOwnedSchedules(tokenId: string):Observable<any>{
    return this.scheduleRepository.getOwnedSchedules(tokenId);
  }

  getSubscribedSchedules(tokenId: string):Observable<any>{
    return this.scheduleRepository.getSubscribedSchedules(tokenId);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../Models/schedule.model';
import { ScheduleRepository } from '../Repositories/schedule.repository';
import { ScheduleFacadeInterface } from './interfaces/scheduleFacade.interface';

@Injectable({
  providedIn: 'root',
})
export class ScheduleFacade implements ScheduleFacadeInterface {
  constructor(private scheduleRepository: ScheduleRepository) {}

  // Define methods to interact with the repository
  getSchedules(): Observable<Schedule[]> {
    return this.scheduleRepository.getAllSchedules();
  }

  getScheduleById(id: string): Observable<Schedule | undefined> {
    return this.scheduleRepository.getScheduleById(id);
  }

  createSchedule(schedule: Schedule):Observable<Schedule> {
    return this.scheduleRepository.createSchedule(schedule)
  }

  updateSchedule(schedule: Schedule, scheduleId: string): Observable<Schedule> {
    return this.scheduleRepository.updateSchedule(schedule, scheduleId);
  }

  deleteSchedule(id: string): Observable<void> {
    return this.scheduleRepository.deleteSchedule(id);
  }
}

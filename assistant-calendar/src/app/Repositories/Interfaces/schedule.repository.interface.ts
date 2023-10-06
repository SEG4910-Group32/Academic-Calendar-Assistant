// schedule.repository.interface.ts

import { Observable } from 'rxjs';
import { Schedule } from '../../Models/schedule.model';

export interface ScheduleRepositoryInterface {
  getAllSchedules(): Observable<Schedule[]>;
  getScheduleById(scheduleId: string): Observable<Schedule>;
  createSchedule(schedule: Schedule):any;
  updateSchedule(schedule: Schedule, scheduleId: string): Observable<Schedule>;
  deleteSchedule(scheduleId: string): Observable<any>;
}

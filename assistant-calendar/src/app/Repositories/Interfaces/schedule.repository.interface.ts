// schedule.repository.interface.ts

import { Observable } from 'rxjs';
import { Schedule } from '../../Models/schedule.model';

export interface ScheduleRepositoryInterface {
  getAllSchedules(): Observable<Schedule[]>;
  getScheduleById(scheduleId: string): Observable<Schedule>;
  createSchedule(schedule: Schedule): Observable<Schedule>;
  updateSchedule(schedule: Schedule): Observable<Schedule>;
  deleteSchedule(scheduleId: string): Observable<void>;
}

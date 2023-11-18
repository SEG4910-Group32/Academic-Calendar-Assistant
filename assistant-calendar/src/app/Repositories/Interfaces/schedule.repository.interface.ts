// schedule.repository.interface.ts

import { Observable } from 'rxjs';
import { Schedule } from '../../Models/schedule.model';

export interface ScheduleRepositoryInterface {
  getAllSchedules(): Observable<Schedule[]>;
  getScheduleById(scheduleId: string, token:string):any;
  createSchedule(schedule: Schedule):any;
  updateSchedule(schedule: Schedule, scheduleId: string, token:string): Observable<Schedule>;

  deleteSchedule(token:string, scheduleId: string): Observable<any>;
  getOwnedSchedules(tokenId: string):Observable<any>;
  getSubscribedSchedules(tokenId: string):Observable<any>;

}

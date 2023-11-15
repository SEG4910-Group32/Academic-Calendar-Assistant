import { Observable } from 'rxjs';
import { Schedule } from 'src/app/Models/schedule.model';

export interface ScheduleFacadeInterface {
  // Define methods to interact with the repository
  getSchedules(): Observable<Schedule[]>;
  
  getScheduleById(id: string): Observable<Schedule | undefined>;
  
  createSchedule(schedule: Schedule): Observable<Schedule>;
  
  updateSchedule(schedule: Schedule, scheduleId: string): Observable<Schedule>;
  

  deleteSchedule(token: string, id: string): Observable<void>;


  getOwnedSchedules(tokenId: string):Observable<any>;

  getSubscribedSchedules(tokenId: string):Observable<any>;

}

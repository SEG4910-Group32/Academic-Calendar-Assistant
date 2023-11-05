import { ScheduleFacade } from '../Facades/schedule.facade';
import { ScheduleRepository } from '../Repositories/schedule.repository';

export function scheduleFacadeFactory(scheduleRepository: ScheduleRepository) {
  return new ScheduleFacade(scheduleRepository);
}

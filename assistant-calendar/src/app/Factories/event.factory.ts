import { EventFacade } from '../Facades/Event.facade';
import { EventRepository } from '../Repositories/event.repository';

export function eventFacadeFactory(eventRepository: EventRepository) {
  return new EventFacade(eventRepository);
}

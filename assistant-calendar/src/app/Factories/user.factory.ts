import { UserFacade } from '../Facades/user.facade';
import { UserRepository } from '../Repositories/user.repository';

export function userFacadeFactory(userRepository: UserRepository) {
  return new UserFacade(userRepository);
}

import { IUserRepository } from '../ports/user-repository.interface';

export interface Dependencies {
  userRepository: IUserRepository;
}

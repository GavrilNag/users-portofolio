import { IUserGateway } from '../ports/user-repository.interface';

export interface Dependencies {
  userGateway: IUserGateway;
}

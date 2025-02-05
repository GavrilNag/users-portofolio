import { IUserGateway } from '../ports/user-gateway.interface';

export interface Dependencies {
  userGateway: IUserGateway;
}

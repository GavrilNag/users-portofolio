import { UserDomainModel } from '../model/user.domain-model';

export interface IUserGateway {
  fetchUsers(): Promise<UserDomainModel.User[]>;
}

import { UserDomainModel } from '../model/user.domain-model';

export interface IUserRepository {
  fetchUsers(): Promise<UserDomainModel.User[]>;
}

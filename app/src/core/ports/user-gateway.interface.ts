import { UserDomainModel } from '../model/user.domain-model';

export interface IUserGateway {
  fetchUsers(): Promise<UserDomainModel.User[]>;
  registerUser(user: Omit<UserDomainModel.User, 'id'>): Promise<void>;
  authenticate(
    email: string,
    password: string,
  ): Promise<{ token: string; user: UserDomainModel.User }>;
}

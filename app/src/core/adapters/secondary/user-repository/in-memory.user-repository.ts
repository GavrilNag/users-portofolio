import { UserDomainModel } from '@/core/model/user.domain-model';
import { IUserGateway } from '@/core/ports/user-repository.interface';

export class InMemoryUserRepository implements IUserGateway {
  public users: UserDomainModel.User[] = [];

  constructor(users: UserDomainModel.User[] = []) {
    this.users = users;
  }

  async fetchUsers() {
    return this.users;
  }
}

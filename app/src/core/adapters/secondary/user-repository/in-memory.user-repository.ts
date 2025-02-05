import { UserDomainModel } from '@/core/model/user.domain-model';
import { IUserGateway } from '@/core/ports/user-gateway.interface';

export class InMemoryUserRepository implements IUserGateway {
  public users: UserDomainModel.User[] = [];

  constructor(users: UserDomainModel.User[] = []) {
    this.users = users;
  }

  async fetchUsers() {
    return this.users;
  }

  async registerUser(user: Omit<UserDomainModel.User, 'id'>) {
    if (this.users.find((u) => u.email === user.email)) {
      throw new Error('User with this email already exists');
    }

    this.users.push({ ...user, id: String(this.users.length + 1) });
  }

  async authenticate(email: string, password: string) {
    const user = this.users.find((u) => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    return { token: 'token', user };
  }
}

import { User } from '@/core/entities/user';
import { IUserRepository } from '@/core/ports/user-repository.interface';

export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  constructor(users: User[] = []) {
    this.users = users;
  }

  async fetchUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser(user: User) {
    this.users.push(user);
    return user;
  }

  async deleteUser(user: User) {
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  async findUserByEmail(email: string) {
    const userFound = this.users.find((u) => u.email === email);
    if (!userFound) {
      throw new Error('User not found');
    }
    return userFound;
  }

  async findUserById(id: string) {
    const userFound = this.users.find((u) => u.id === id);
    if (!userFound) {
      throw new Error('User not found');
    }
    return userFound;
  }

  async updateUser(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
    return user;
  }
}

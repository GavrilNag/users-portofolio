import { User } from '../entities/user';

export interface IUserRepository {
  fetchUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(user: User): Promise<void>;
}

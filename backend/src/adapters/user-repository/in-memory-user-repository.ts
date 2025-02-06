import { SystemIDProvider } from "../../core/system.id-provider";
import { CreateUserDTO } from "../../dtos/create-user.dto";
import { UpdateUserDTO } from "../../dtos/update-user.dto";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../ports/user-repository.interface";

export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  async create(user: CreateUserDTO): Promise<User> {
    const newUser = { ...user, id: new SystemIDProvider().generate() };
    this.users.push(newUser);
    return newUser;
  }

  async update(user: UpdateUserDTO): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);
    const updatedUser = { ...this.users[index], ...user };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id);
  }

  async find(id: string): Promise<User> {
    const userFound = this.users.find((u) => u.id === id);

    if (!userFound) {
      throw new Error("User not found");
    }

    return userFound;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}

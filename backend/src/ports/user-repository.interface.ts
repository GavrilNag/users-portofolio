import { CreateUserDTO } from "../dtos/create-user.dto";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { User } from "../entities/user.entity";

export interface IUserRepository {
  create: (user: CreateUserDTO) => Promise<User>;
  update: (user: UpdateUserDTO) => Promise<User>;
  delete: (id: string) => Promise<void>;
  find: (id: string) => Promise<User>;
  findAll: () => Promise<User[]>;
}

import { CreateUserDTO } from "../../dtos/create-user.dto";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../ports/user-repository.interface";
import { Executable } from "../../shared/executable";

type Request = CreateUserDTO;

type Response = User;

export class CreateUser implements Executable<Request, Response> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: Request) {
    return this.userRepository.create(request);
  }
}

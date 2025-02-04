import { UserDomainModel } from './user.domain-model';

export class UserFactory {
  static create(data?: Partial<UserDomainModel.User>): UserDomainModel.User {
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      password: 'password',
      birthdate: new Date().toISOString(),
      ...data,
    };
  }
}

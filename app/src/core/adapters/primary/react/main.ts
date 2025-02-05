import { UserFactory } from '@/core/model/user.factory';
import { Dependencies } from '@/core/store/dependencies';
import { AppStore, createStore } from '@/core/store/store';
import { InMemoryUserRepository } from '../../secondary/user-repository/in-memory.user-repository';

export class App {
  public dependencies: Dependencies;
  public store: AppStore;

  constructor() {
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    return {
      userGateway: new InMemoryUserRepository([
        UserFactory.create({
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          password: '123456789',
          birthdate: '1990-01-01',
        }),
      ]),
    };
  }
}

export const app = new App();

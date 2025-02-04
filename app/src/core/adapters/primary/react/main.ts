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
      userRepository: new InMemoryUserRepository(),
    };
  }
}

export const app = new App();

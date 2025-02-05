import { InMemoryUserRepository } from '@/core/adapters/secondary/user-repository/in-memory.user-repository';
import { UserDomainModel } from '@/core/model/user.domain-model';
import { Dependencies } from '@/core/store/dependencies';
import { AppStore, createStore } from '@/core/store/store';
import { beforeEach, describe, expect, it } from 'vitest';
import { registerNewUser } from './register-new-user';

describe('Feature: Registering a user', () => {
  let store: AppStore;
  let userGateway: InMemoryUserRepository;

  beforeEach(() => {
    userGateway = new InMemoryUserRepository();
    const dependencies = {
      userGateway,
    } satisfies Dependencies;
    store = createStore({ dependencies });
  });

  describe('Scenario: happy path', () => {
    it('should store a new user when registering', async () => {
      const newUserPayload = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        password: '123456789',
        birthdate: '1990-01-01',
      } satisfies Omit<UserDomainModel.User, 'id'>;

      await store.dispatch(registerNewUser(newUserPayload));
      expect(userGateway.users).toHaveLength(1);
      expect(store.getState().users.registerNewUser.status).toEqual('success');
    });
    it('should throw error and not store a user if a user with the same email already exists', async () => {
      const newUserPayload = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        password: '123456789',
        birthdate: '1990-01-01',
      } satisfies Omit<UserDomainModel.User, 'id'>;
      await store.dispatch(registerNewUser(newUserPayload));
      expect(userGateway.users).toHaveLength(1);
      await store.dispatch(registerNewUser(newUserPayload));
      expect(userGateway.users).toHaveLength(1);
      expect(store.getState().users.registerNewUser.status).toEqual('error');
      expect(store.getState().users.registerNewUser.error).toEqual(
        'User with this email already exists',
      );
    });
  });
});

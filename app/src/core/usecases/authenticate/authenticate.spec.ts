import { InMemoryUserRepository } from '@/core/adapters/secondary/user-repository/in-memory.user-repository';
import { Dependencies } from '@/core/store/dependencies';
import { AppStore, createStore } from '@/core/store/store';
import { beforeEach, describe, expect, it } from 'vitest';
import { authenticate } from './authenticate';

describe('Feature: Authenticating', () => {
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
    it('should authenticate properly', async () => {
      userGateway.users = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          password: '123456789',
          birthdate: '1990-01-01',
        },
      ];
      const loginPayload = {
        email: 'john.doe@gmail.com',
        password: '123456789',
      };
      expect(store.getState().auth.token).toBe(null);
      await store.dispatch(authenticate(loginPayload));
      expect(store.getState().auth.token).toBe('token');
    });
    it('should throw error and not log in the user if the password missed match', async () => {
      const loginPayload = {
        email: 'john.doe@gmail.com',
        password: '123456789',
      };
      expect(store.getState().auth.token).toBe(null);
      await store.dispatch(authenticate(loginPayload));
      expect(store.getState().auth.token).toBe(null);
    });
  });
});

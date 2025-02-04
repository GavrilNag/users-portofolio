import { InMemoryUserRepository } from '@/core/adapters/secondary/user-repository/in-memory.user-repository';
import { Dependencies } from '@/core/store/dependencies';
import { AppStore, createStore } from '@/core/store/store';
import { beforeEach, describe, expect, it } from 'vitest';
import { fetchUsers } from './retrieve-all-users';

describe('Feature: Handling retrieving users', () => {
  let store: AppStore;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository([]);
    const dependencies = {
      userRepository,
    } satisfies Dependencies;
    store = createStore({ dependencies });
  });

  describe('Scenario: happy path', () => {
    it('should store an empty list of users', async () => {
      await store.dispatch(fetchUsers());
      expect(store.getState().users.availableUsers.data).toEqual([]);
    });
  });
});

import { InMemoryUserRepository } from '@/core/adapters/secondary/user-repository/in-memory.user-repository';
import { UserFactory } from '@/core/model/user.factory';
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
    it('should store a list with a user named John Doe', async () => {
      userRepository.users = [UserFactory.create()];
      await store.dispatch(fetchUsers());
      expect(store.getState().users.availableUsers.data.length).toEqual(1);
      expect(store.getState().users.availableUsers.data[0].firstName).toEqual('John');
      expect(store.getState().users.availableUsers.data[0].lastName).toEqual('Doe');
    });
  });
});

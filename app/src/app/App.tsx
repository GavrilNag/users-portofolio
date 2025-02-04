import { Button } from '@/core/adapters/primary/react/components/ui/button';
import { selectUsersAvailableState } from '@/core/selectors/users.selector';
import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { fetchUsers } from '@/core/usecases/retrieve-all-users/retrieve-all-users';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const { data: users, status } = useAppSelector(selectUsersAvailableState);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <main>
      <h1>liste des utilisateurs</h1>

      {status === 'loading' && <div>Loading...</div>}
      {users.map((user) => (
        <div key={user.id}>
          {user.firstName} {user.lastName}
        </div>
      ))}
      <Button onClick={() => dispatch(fetchUsers())}>Refresh</Button>
    </main>
  );
}

export default App;

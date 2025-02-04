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
    <main className="bg-red-500">
      <h1 className="text-3xl font-bold underline">liste des utilisateurs</h1>

      {status === 'loading' && <div>Loading...</div>}
      {users.map((user) => (
        <div key={user.id} className="bg-blue-500">
          {user.firstName} {user.lastName}
        </div>
      ))}
    </main>
  );
}

export default App;

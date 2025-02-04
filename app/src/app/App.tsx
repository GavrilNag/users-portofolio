import { selectUsersAvailable } from '@/core/selectors/users.selector';
import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { fetchUsers } from '@/core/usecases/retrieve-all-users/retrieve-all-users';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersAvailable);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <main>
      liste des utilisateurs
      {users.map((user) => (
        <div key={user.id}>
          {user.firstName} {user.lastName}
        </div>
      ))}
    </main>
  );
}

export default App;

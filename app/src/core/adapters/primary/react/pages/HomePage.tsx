import { selectUsersAvailable } from '@/core/selectors/users.selector';
import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { fetchUsers } from '@/core/usecases/fetchUsers/fetch-users';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

function HomePage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersAvailable);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">User List</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>{`${user.firstName} ${user.lastName}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Birthday: {user.birthdate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

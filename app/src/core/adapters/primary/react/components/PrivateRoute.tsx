import { useAppSelector } from '@/core/store/store';
import { Navigate } from 'react-router';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

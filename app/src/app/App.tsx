import AppWrapper from '@/core/adapters/primary/react/components/AppWraper';
import PrivateRoute from '@/core/adapters/primary/react/components/PrivateRoute';
import HomePage from '@/core/adapters/primary/react/pages/HomePage';
import LoginPage from '@/core/adapters/primary/react/pages/LoginPage';
import RegisterPage from '@/core/adapters/primary/react/pages/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router';

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route
            index
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}

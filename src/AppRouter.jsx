import { Routes, Route, Navigate  } from 'react-router-dom';
import { AuthRoutes } from './auth/router/AuthRoutes';
import { DashboardRoutes } from './dashboard/router/DashboardRoutes';
import { Consult } from './auth/pages/Consult';
import { useSelector } from 'react-redux';

export const AppRouter = () => {

  const { token } = useSelector(state => state.auth);

  return (
    <Routes>
      { token !== ''
        ? <Route path="/dashboard/*" element={<DashboardRoutes />} />
        : <Route path="/login/*" element={<AuthRoutes />} />
      }
      <Route path="/consult" element={<Consult />} />
      <Route path="/*" element={<Navigate to={token !== '' ? '/dashboard' : '/login'} />} />
    </Routes>
  );

}

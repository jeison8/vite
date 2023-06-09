import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="" element={ <Login /> } />
        {/* <Route path="*" element={ <Navigate to="/login" /> } /> */}
    </Routes>
  )
}

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { isLogged } from '../utils';

const PrivateRoute: React.FC = () => {
  const location = useLocation();
  return isLogged() ? (
    <MainLayout />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default PrivateRoute;


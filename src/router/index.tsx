import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chat from '../pages/Chat';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoutes';

const RouterPage: React.FC = () => {
  return (
    <Routes>
      <Route path='login' Component={Login} />
      <Route element={<PrivateRoute />}>
        <Route path='' Component={Dashboard} />
        <Route path='chat' Component={Chat} />
        <Route path='contatos' Component={Chat} />
      </Route>
    </Routes>
  );
};

export default RouterPage;


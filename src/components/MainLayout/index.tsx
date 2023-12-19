import React from 'react';

import { Outlet } from 'react-router-dom';
import SideMenu from '../SideMenu';
import { Container, Main, SideContainer } from './styles';

const MainLayout: React.FC = () => {
  return (
    <Container>
      <SideContainer>
        <SideMenu />
      </SideContainer>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default MainLayout;


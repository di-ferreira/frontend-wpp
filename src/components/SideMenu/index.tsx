import React, { useState } from 'react';

import {
  BarChart,
  LogOut,
  MessageCircle,
  Settings,
  User,
  Users,
} from 'react-feather';
import { NavLink } from 'react-router-dom';
import { iSession } from '../../@types';
import api from '../../service/api';
import { getSession, getToken } from '../../service/auth';
import { isActiveLink } from '../../utils';
import ChangeSessionDialog from '../MainLayout/ChangeSessionDialog';
import {
  BottomItems,
  ChangeSession,
  Container,
  InfoSession,
  Layout,
  LogoutButton,
  MenuList,
  MenuListItem,
} from './styles';

const SideMenu: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<iSession | null>(
    getSession()
  );

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (value: iSession) => {
    setOpenDialog(false);
    setSelectedValue(value);
  };

  const handleClickDisabled = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  async function logoutSession(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    await api.post(`${getSession()}/logout-session`, null, config);
    window.location.href = '/';
  }

  async function closeSession() {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    await api.post(`${getSession()}/close-session`, null, config);
    window.location.href = '/nova-sessao';
  }

  return (
    <Layout>
      {openDialog && (
        <ChangeSessionDialog
          handleClose={handleClose}
          open={openDialog}
          selectedValue={selectedValue}
        />
      )}

      <Container>
        <MenuList>
          <MenuListItem active={isActiveLink('/chat')}>
            <NavLink to={'chat'}>
              <MessageCircle /> Chat
            </NavLink>
          </MenuListItem>

          <MenuListItem active={isActiveLink('/contatos')}>
            <NavLink to={'contatos'}>
              <User /> Contacts
            </NavLink>
          </MenuListItem>

          <MenuListItem active={isActiveLink('/grupo')}>
            <NavLink to={'grupo'}>
              <Users /> Groups
            </NavLink>
          </MenuListItem>

          <MenuListItem
            active={isActiveLink('/relatorio')}
            className='disabled'
          >
            <NavLink
              to={'relatorio'}
              className='disabled'
              onClick={handleClickDisabled}
            >
              <BarChart /> Reports
            </NavLink>
          </MenuListItem>

          <MenuListItem active={isActiveLink('/settings')} className='disabled'>
            <NavLink
              to={'settings'}
              className='disabled'
              onClick={handleClickDisabled}
            >
              <Settings /> Settings
            </NavLink>
          </MenuListItem>

          <MenuListItem active={isActiveLink('/logout')}>
            <NavLink to={'logout'} onClick={logoutSession}>
              <LogOut /> LogOut
            </NavLink>
          </MenuListItem>
        </MenuList>

        <BottomItems>
          <ChangeSession>
            <div>
              <div className={'online-circle'} />
              <p>Online</p>
            </div>

            <div>
              <a
                href={'/change-session'}
                onClick={(e) => {
                  e.preventDefault();
                  handleClickOpen();
                }}
              >
                Change
              </a>
            </div>
          </ChangeSession>

          <InfoSession>
            <img
              src={`https://ui-avatars.com/api/?name=${getSession()}?background=random`}
              alt={selectedValue?.session}
            />
            <div>
              <p>{selectedValue?.session}</p>
              <small>Active Session</small>
            </div>
          </InfoSession>

          <LogoutButton onClick={() => closeSession()}>Logout</LogoutButton>
        </BottomItems>
      </Container>
    </Layout>
  );
};

export default SideMenu;


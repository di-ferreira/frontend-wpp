import React from 'react';

import {
  Avatar,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { Layout, List, Plus, User } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { iSession } from '../../../../@types';
import { login } from '../../../../service/auth';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

interface iAllSessionsDialog {
  onClose: (value: iSession) => void;
  selectedValue: iSession | null;
  open: boolean;
  sessions: iSession[];
}

const AllSessionsDialog: React.FC<iAllSessionsDialog> = ({
  onClose,
  selectedValue,
  open,
  sessions,
}) => {
  const classes = useStyles();
  const history = useNavigate();

  const handleClose = () => {
    if (selectedValue) {
      onClose(selectedValue);
    }
  };

  const handleListItemClick = (session: iSession) => {
    onClose(session);
    login(session);
    window.location.reload();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <Layout>
        <DialogTitle id='simple-dialog-title'>Escolha uma sessão</DialogTitle>
        <List>
          {sessions.map((sessao, index) => (
            <ListItem
              button
              onClick={() => handleListItemClick(sessao)}
              key={index}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <User />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={sessao.session} />
            </ListItem>
          ))}

          <ListItem autoFocus button onClick={() => history('nova-sessao')}>
            <ListItemAvatar>
              <Avatar>
                <Plus />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Nova Sessão' />
          </ListItem>
        </List>
      </Layout>
    </Dialog>
  );
};

export default AllSessionsDialog;


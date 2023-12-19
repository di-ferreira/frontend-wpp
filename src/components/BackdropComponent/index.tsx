import { Backdrop, makeStyles } from '@material-ui/core';
import React from 'react';
import { Layout } from './styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backdropFilter: 'blur(15px)',
  },
}));

interface iBackdropComponent {
  open: boolean;
}

const BackdropComponent: React.FC<iBackdropComponent> = ({ open }) => {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <Layout>
          <h1>Please wait...</h1>
        </Layout>
      </Backdrop>
    </div>
  );
};

export default BackdropComponent;


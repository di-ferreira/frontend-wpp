import { Backdrop, Fade, Modal, makeStyles } from '@material-ui/core';
import { Link } from 'react-feather';
import { ModalContainer } from './styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#E9E9E9',
    border: 0,
    outline: 0,
    width: 400,
    '@media (max-width:768px)': {
      maxWidth: '90%',
    },
    boxShadow: theme.shadows[5],
    padding: 0,
    borderRadius: 12,
  },
}));

interface iModalMenu {
  open: boolean;
  handleClose: () => void;
}

const ModalMenu: React.FC<iModalMenu> = ({ handleClose, open }) => {
  const classes = useStyles();

  const onClose = () => {
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <ModalContainer>
              <div className={'middle-section'}>
                <h2>Token</h2>
                <p>
                  Não sabe o token? Dá uma olhada lá na documentação do servidor
                  😃
                </p>
              </div>

              <div className={'bottom-section'}>
                <button onClick={handleClose}>Fechar</button>

                <a
                  href={'https://github.com/wppconnect-team/wppconnect-server'}
                  rel={'noreferrer'}
                  target={'_blank'}
                >
                  <Link /> Abrir Documentação
                </a>
              </div>
            </ModalContainer>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalMenu;


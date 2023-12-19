import React, { useEffect, useRef, useState } from 'react';

import { Backdrop, Fade, Modal, makeStyles } from '@material-ui/core';
import { X } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../../assets/login-v2.72cd8a26.svg';
import BackdropComponent from '../../components/BackdropComponent';
import ErrorModal from '../../components/ErrorModal';
import ModalMenu from '../../components/ModalMenu';
import api, { socket } from '../../service/api';
import { getSession, getToken, login } from '../../service/auth';
import { Layout } from '../../style/GlobalStyle';
import { isActiveLink, isLogged } from '../../utils';
import {
  Container,
  Description,
  Formulario,
  ImageCustom,
  Title,
} from './styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 0,
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: 0,
    width: '100%',
    height: '100%',
  },
}));
const Login: React.FC = () => {
  const history = useNavigate();
  const classes = useStyles();
  const [open] = useState(true);
  const [session, setSession] = useState('');
  const [token, setToken] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [titleError, setTitleError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const animationRef = useRef<any>(null);

  const haveLogin = isActiveLink('/login');

  useEffect(() => {
    if (isLogged()) history('/');
    socket.on('qrCode', (qrCode) => {
      if (session === qrCode.session) {
        setQrCode(qrCode.data);
        handleCloseBackdrop();
        if (animationRef.current !== null) {
          animationRef.current.classList.remove('animation');
        }
      }
    });

    socket.off('session-logged').on('session-logged', (status) => {
      if (status.session === session) {
        if (token) {
          insertLocalStorage();

          setTimeout(() => {
            history('/');
          }, 500);
        }
      }
    });
  }, [session, token]);

  async function submitSession(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (session === '') {
      handleOpenErrorModal();
      setTitleError('Preencha todos os campos');
      setErrorMessage(
        'Você precisa preencher todos os campos antes de continuar.'
      );
    } else {
      handleToggleBackdrop();
      await startSession();
    }
  }

  function insertLocalStorage() {
    login({ session: session, token: token });
    getToken();
    getSession();
  }

  async function startSession() {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const checkConn = await api.get(`${session}/check-connection-session`);
      if (!checkConn.data.status) {
        await signSession();
      } else {
        insertLocalStorage();
        history('/chat');
      }
    } catch (e) {
      setTimeout(function () {
        handleCloseBackdrop();
        handleOpenErrorModal();
        setTitleError('Oops... Algo deu errado.');
        setErrorMessage('Verifique se a sessão e o token estão corretos.');
      }, 2000);
    }
  }

  async function signSession() {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    await api.post(`${session}/start-session`);
  }

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

  const handleCloseModal = () => {
    setOpenMenuModal(false);
  };

  const handleOpenModal = () => {
    setOpenMenuModal(true);
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Layout className={classes.paper}>
            <ModalMenu handleClose={handleCloseModal} open={openMenuModal} />
            <ErrorModal
              handleClose={handleCloseErrorModal}
              open={openErrorModal}
              errorMessage={errorMessage}
              titleError={titleError}
            />
            <BackdropComponent open={openBackdrop} />
            {haveLogin && (
              <div className={'close-item'} onClick={() => history('login')}>
                <X />
              </div>
            )}
            <Container>
              <div className={'container-session'}>
                <div id={'left-div'}>
                  <img src={LoginImage} alt={'Login Team'} />
                </div>

                <div id={'right-div'}>
                  {qrCode === '' ? null : (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <ImageCustom
                        ref={animationRef}
                        className={'animation noselect'}
                        src={qrCode}
                        alt={'Smartphone'}
                        draggable={'false'}
                      />
                      <Title>Scan QRCode</Title>
                    </div>
                  )}

                  {qrCode !== '' ? null : (
                    <Formulario onSubmit={(e) => submitSession(e)}>
                      <Title id={'title'}>Entre com sua sessão</Title>

                      <Description id={'description'}>
                        Digite o nome da sessão e token para entrar em sua conta
                      </Description>

                      <div className={'top-info'}>
                        <small>Sessão</small>
                      </div>
                      <input
                        id={'session'}
                        autoComplete='off'
                        placeholder='Nome da sessão'
                        value={session}
                        onChange={(e) => setSession(e.target.value)}
                      />

                      <div className={'top-info'}>
                        <small>Token</small>

                        <span onClick={() => handleOpenModal()}>
                          Não sabe o token?
                        </span>
                      </div>

                      <input
                        id={'token'}
                        autoComplete='off'
                        placeholder='Token'
                        value={token}
                        onChange={(e) => {
                          setToken(e.target.value);
                        }}
                      />

                      <button type='submit' id='send-btn'>
                        Enviar
                      </button>
                    </Formulario>
                  )}
                </div>
              </div>
            </Container>
          </Layout>
        </Fade>
      </Modal>
    </div>
  );
};

export default Login;


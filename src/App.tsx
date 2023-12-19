import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import RouterPage from './router';
import GlobalStyle, { Container, Layout } from './style/GlobalStyle';
import light from './style/theme/light';

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={light}>
        <Layout>
          <Container>
            <RouterPage />
          </Container>
        </Layout>

        <GlobalStyle />
        <ToastContainer />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;


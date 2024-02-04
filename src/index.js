import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from 'components/App';
import GlobalStyle from './styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = {
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    accent: '#3f51b5',
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
      <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>
);

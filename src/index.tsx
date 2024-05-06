import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Estados
import GlobalState from './Context/Global/GlobalState';
import PacientesState from './Context/Pacientes/PacientesState';

//Temas de Material UI
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
//componentes

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <GlobalState>
      <PacientesState>
        <React.StrictMode>
          <App />
          
        </React.StrictMode>
      </PacientesState>
    </GlobalState>
  </ThemeProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

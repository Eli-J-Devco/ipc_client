import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-tooltip/dist/react-tooltip.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import en from './languages/en.json';
import vi from './languages/vi.json';
import th from './languages/th.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    vi: {
      common: vi
    },
    en: {
      common: en
    },
    th: {
      common: th
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <I18nextProvider i18n={i18next}>
    <App />
    </I18nextProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

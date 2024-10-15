import React from "react";
import ReactDOM from "react-dom/client";
import "react-tooltip/dist/react-tooltip.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import en from "./languages/en.json";
import vi from "./languages/vi.json";
import th from "./languages/th.json";
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataloggerProvider } from "./context/DataloggerProvider";
import { MQTTProvider } from "./context/MQTTReaderProvider";

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  th: { translation: th },
};

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "en", // if you're using a language detector, do not define the lng option
  debug: false,
  resources,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <DndProvider backend={HTML5Backend}>
          <AuthProvider>
            <MQTTProvider>
              <DataloggerProvider>
                <App />
                <div id="progress"></div>
                <ToastContainer />
              </DataloggerProvider>
            </MQTTProvider>
          </AuthProvider>
        </DndProvider>
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

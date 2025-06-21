import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import CreateAdmin from './components/admin/CreateAdmin';
import Core from './pages/Core';
import AuthLevelProvider from './contexts/AuthLevelProvider';
import CookiesProvider from './contexts/CookiesProvider';
import Cookies from './components/Cookies';
import NotFound from './pages/NotFound';
import Return from './components/stripe/Return';
import ErrorPanelProvider from './contexts/ErrorPanelProvider';
import ErrorPanel from './components/ErrorPanel';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CookiesProvider>
        <ErrorPanelProvider>
          <ErrorPanel />
          <AuthLevelProvider>
            <Banner />
            <main>
              <Routes>
                <Route path="/" element={<Core />} />
                <Route path="/startapphere" element={<CreateAdmin />} />
                <Route path="/return/:ticketId" element={ <Return /> } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </AuthLevelProvider>
        </ErrorPanelProvider>
        <Cookies />
      </CookiesProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

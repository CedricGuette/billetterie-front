import React from 'react';
import ReactDOM from 'react-dom/client';
import Core from './components/Core';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerRegisterForm from './components/CustomerRegisterForm';
import Login from './components/Login';
import Banner from './components/Banner';

import CreateModerator from './components/CreateModerator';
import CreateSecurity from './components/CreateSecurity';
import ValidateQr from './components/ValidateQr';
import Administration from './components/Administration';
import PaypalPayer from './components/PaypalPayer';
import AuthLevel from './components/AuthLevelProvider';
import CreateAdmin from './components/CreateAdmin';
import ModeratorProfile from './components/ModeratorProfile';
import AuthLevelProvider from './components/AuthLevelProvider';
import UsersList from './components/UsersList';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthLevelProvider>
        <Banner />
        <main>
          <Routes>
            <Route path="/" element={<Core />} />
            <Route path="/reservation" element={<CustomerRegisterForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/moderator" element={<ModeratorProfile />} />
            <Route path="/createmoderator" element={<CreateModerator />} />
            <Route path="/createsecurity" element={<CreateSecurity />} />
            <Route path="/createadmin" element={<CreateAdmin />} />
            <Route path="/security" element={<ValidateQr />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/userslist" element={<UsersList />} />
            <Route path="/pay/:ticket" element={<PaypalPayer />} />
            <Route path="/startapphere" element={<CreateAdmin />} />
            <Route path="*" element={<h1>404 Page non trouvée</h1>} />
          </Routes>
        </main>
      </AuthLevelProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

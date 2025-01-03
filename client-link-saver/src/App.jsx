import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import NavBar from './components/Navbar';

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <HomePage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import Dashboard from './pages/DashboardPage';
import NavBar from './components/Navbar';

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

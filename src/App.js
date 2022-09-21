import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Users from './pages/Users';
import User from './pages/User';
import About from './pages/About';

function App() {
  return (
    <div className="App h-full flex flex-col">
      <header className="App-header h-22">
          <nav>
              <Link to="/">USERS</Link> |{' '}
              <Link to="about">ABOUT</Link>
          </nav>
      </header>
        <Routes>
            <Route path="/" element={<Users />} />
            <Route path="user/:id" element={<User />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </div>
  );
}

export default App;

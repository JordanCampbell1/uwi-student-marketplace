import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/SignUp';
import Signup from './pages/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListing from './pages/ProductListing';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list" element={<ProductListing />} />

          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

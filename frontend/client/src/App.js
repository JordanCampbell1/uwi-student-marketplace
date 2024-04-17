import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductListing from './pages/ProductListing';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthTokens } from './utils/reducers';
import {jwtDecode} from 'jwt-decode'; 
import { setUser } from './utils/reducers';
import EditUserPage from './pages/EditUserPage';
import MyListings from './pages/MyListings';
import EditProductPage from './pages/EditProductPage';
import PrivateRoute from './PrivateRoute';
import ProductDetails from './pages/ProductDetails';

function App() {
  const dispatch = useDispatch();
  let userCreds = localStorage.getItem("authTokens");
  
  if (userCreds) {
    const parsedCreds = JSON.parse(userCreds);
    dispatch(setAuthTokens(parsedCreds));
    dispatch(setUser(jwtDecode(parsedCreds.access)));
  } else {
    dispatch(setAuthTokens(null));
    dispatch(setUser(null));
  }

  return (
    <Router>
      <div className="App">
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list" element={<PrivateRoute><ProductListing /></PrivateRoute>} />
          <Route path="/edit" element={<PrivateRoute><EditUserPage /></PrivateRoute>} />
          <Route path="/my-listings" element={<PrivateRoute><MyListings /></PrivateRoute>} />    
          <Route path="/edit-listing" element={<PrivateRoute><EditProductPage /></PrivateRoute>} />    
          <Route path="/products/:productId" element={<ProductDetails/>} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListing from './pages/ProductListing';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAuthTokens } from './utils/reducers';
import { jwtDecode } from 'jwt-decode'; 
import { setUser } from './utils/reducers';
import EditUserPage from './pages/EditUserPage';
function App() {
  const dispatch = useDispatch();
  let userCreds = localStorage.getItem("authTokens");
  //let AuthTokens=useSelector(state=>state.AuthTokens)
  userCreds
    ? dispatch(setAuthTokens(JSON.parse(userCreds)))
    : dispatch(setAuthTokens(null));
  userCreds
    ? dispatch(setUser(jwtDecode(JSON.parse(userCreds).access)))
    : dispatch(setUser(null));
  return (
    <Router>
      <div className="App">
      <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list" element={<ProductListing />} />
          <Route path="/edit" element={<EditUserPage />} />

          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

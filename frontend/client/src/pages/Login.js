import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.png'; // Adjust the path as needed
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setAuthTokens,setUser } from "../utils/reducers";
import { jwtDecode } from 'jwt-decode'; // Corrected named import statement



const Login = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const goToSignUp = () => navigate('/signup'); // Update the path if necessary
    const handleLogin = async (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', { // Replace with your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            let data = await response.json();
            if (!response.ok) {
                throw new Error('Login failed');
            }
            console.log(data)
            if (response.status === 200) {
                dispatch(setAuthTokens(data));
                dispatch(setUser(jwtDecode(data.access)));
                localStorage.setItem("authTokens", JSON.stringify(data));
                navigate("/", { replace: true });
            }
            // Handle successful login here
            // navigate('/'); // Redirect to dashboard after successful login
            // dispatch(setAuthTokens(data));
            // dispatch(setUser(jwt_decode(data.access)));
            // localStorage.setItem("authTokens", JSON.stringify(data));
        } catch (err) {
            toast.error(err.message);
        }
    };
  

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <div className="h-auto w-1/3 bg-white shadow-xl rounded-lg py-10 flex flex-col items-center space-y-6">
                <div className="w-full flex flex-col items-center justify-center">
                    <img src={logo} alt="Logo" className="h-20 mb-2"/>
                    <h1 className="text-xl font-bold text-gray-700 text-center">UWI STUDENT MARKETPLACE <br/> LOGIN</h1>
                </div>
                <form className="w-full px-16 flex flex-col items-center space-y-4" onSubmit={handleLogin}>
                    <input
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-200 ease-in-out w-full">
                        Login
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
                <p className="text-gray-600">
                    Don't have an account? 
                    <span 
                        onClick={goToSignUp} 
                        className="text-red-500 hover:text-red-600 cursor-pointer ml-1"
                    >
                        Sign up here
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login;

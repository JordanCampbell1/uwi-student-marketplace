import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.png'; // Adjust the path as needed

const Login = () => {
    const navigate = useNavigate();

    const goToSignUp = () => navigate('/signup'); // Update the path if necessary

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <div className="h-auto w-1/3 bg-white shadow-xl rounded-lg py-10 flex flex-col items-center space-y-6">
                <div className="w-full flex flex-col items-center justify-center">
                    <img src={logo} alt="Logo" className="h-20 mb-2"/>
                    <h1 className="text-xl font-bold text-gray-700 text-center">UWI STUDENT MARKETPLACE <br/> LOGIN</h1>
                </div>
                <form className="w-full px-16 flex flex-col items-center space-y-4">
                    {/* ... other input fields ... */}
                    <input
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Username"
                        type="text"
                    />
                    <input
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Password"
                        type="password"
                    />
                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-200 ease-in-out w-full">
                        Sign Up
                    </button>
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

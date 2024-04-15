import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from '../images/logo.png'; // Adjust the path as needed

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentID, setStudentID] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const goToLogin = () => navigate('/login'); // Update the path if necessary
    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', { // Replace with your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    first_name: firstName,
                    last_name: lastName,
                    studentID,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            // Handle successful signup here
            navigate('/login'); // Redirect to dashboard or login page after signup
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100 hide-scrollbar">
            <div className="h-auto w-[50%] bg-white shadow-xl rounded-lg py-10 flex flex-col items-center space-y-6">
                <div className="w-full flex flex-col items-center justify-center cursor-pointer" >
                    <img src={logo} alt="Logo" className="h-20 mb-2" />
                    <h1 className="text-xl font-bold text-gray-700">UWI STUDENT MARKETPLACE SIGNUP</h1>
                </div>
                <form className="w-full px-16 flex flex-col items-center space-y-4"  onSubmit={handleSignup}>
                    <input
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="flex w-full space-x-4">
                        <input
                            className="border border-gray-300 p-3 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}

                        />
                        <input
                            className="border border-gray-300 p-3 w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <input
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Student ID" value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                    />
                    <input
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-200 ease-in-out w-full">
                        Sign Up
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
                <p className="text-gray-600">
                    Already have an account? 
                    <span 
                        onClick={goToLogin} 
                        className="text-red-500 hover:text-red-600 cursor-pointer ml-1"
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Signup;

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NavBarWithCart from "../components/NavBarWithCart";
import { useNavigate } from 'react-router-dom'

const EditUserPage = () => {
    const AuthTokens = useSelector(state => state.AuthTokens);
    const navigate = useNavigate(); 
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        studentID: '',
        // Include other fields as necessary
    });

    // Store the initial state for comparison
    const [initialState, setInitialState] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/user-info/', {
                headers: {
                    'Authorization': `Bearer ${AuthTokens.access}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    studentID: data.studentID,
                    // Set other fields if necessary
                });
                setInitialState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    studentID: data.studentID,
                    // Set other fields if necessary
                });
            } else {
                toast.error('Failed to load user data');
            }
        };

        if (AuthTokens) {
            fetchUserData();
        }
    }, [AuthTokens]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const updateUser = {
          ...(user.firstName !== initialState.firstName && { firstName: user.firstName }),
          ...(user.lastName !== initialState.lastName && { lastName: user.lastName }),
          ...(user.email !== initialState.email && { email: user.email }),
          ...(user.studentID !== initialState.studentID && { studentID: user.studentID }),
          // Add other fields as necessary
      };
  
      if (Object.keys(updateUser).length) {
          try {
              const response = await fetch('http://127.0.0.1:8000/api/update-user/', { // Replace with the correct API endpoint
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${AuthTokens.access}`
                  },
                  body: JSON.stringify(updateUser)
              });
  
              if (response.ok) {
                  const data = await response.json();
                  toast.success('Profile updated successfully');
                  // Optionally update the user state with the new data
                  setUser(prevState => ({ ...prevState, ...updateUser }));
                  setInitialState(prevState => ({ ...prevState, ...updateUser }));
              } else {
                  throw new Error('Failed to update profile');
              }
          } catch (error) {
              console.error('There was an error updating the user data', error);
              toast.error('There was an error updating the user data');
          }
      } else {
          toast.info('No changes to update');
      }
  };
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/delete-account/', { // Replace with your API endpoint
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${AuthTokens.access}`
                }
            });

            if (response.ok) {
                toast.success('Account deleted successfully');
                // Log out the user or redirect to a different page
                navigate('/login'); // Replace with appropriate route
            } else {
                throw new Error('Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account', error);
            toast.error('Error deleting account');
        }
    }
};

    return (
        <div className="w-[100vw] h-[100vh] relative flex flex-col items-center">
            <NavBarWithCart/>
            <div className="w-[80%] h-[50%] flex flex-col items-center gap-2 mt-4">  
                <h1 className="w-full flex justify-center py-2 text-2xl">Personal Information</h1>
                <div className="flex w-1/2 gap-4 justify-center"> 
                    <TextField 
                        label="Firstname" 
                        variant="outlined" 
                        sx={{ width: '50%' }} 
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        label="Lastname" 
                        variant="outlined" 
                        sx={{ width: '50%' }} 
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex w-1/2 gap-4">
                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        sx={{ width: '100%' }} 
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex w-1/2 gap-4">
                    <TextField 
                        label="StudentID" 
                        variant="outlined" 
                        sx={{ width: '100%' }} 
                        name="studentID"
                        value={user.studentID}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Add other fields as necessary */}
                <div className="flex w-1/2 gap-4">
                    <Button variant="contained" onClick={handleSubmit}>Update Account</Button>
                    <Button variant="contained" color="secondary" onClick={handleDeleteAccount}>Delete Account</Button>           
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;

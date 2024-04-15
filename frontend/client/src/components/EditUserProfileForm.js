import React, { useState } from 'react';
import InputField from './InputField';
import ImageUploadField from './ImageUploadField';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const EditUserProfileForm = () => {
  let AuthTokens = useSelector(state => state.AuthTokens);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bio: '',
    avatar: null
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const validateForm = () => {
    // Add validation logic here
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }
  
    // Log data for verification
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
  
    // Add logic to send data to your backend API
    console.log(data);
    toast.success('Profile updated successfully');
  };
  
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100 py-6">
          <div className="px-4 py-5 sm:px-6 border-b">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Personal Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Use this form to update your profile details.</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField label="Full Name" name="fullName" type="text" placeholder="John Doe" onChange={handleInputChange} />
              <InputField label="Email" name="email" type="email" placeholder="johndoe@example.com" onChange={handleInputChange} />
              <InputField label="Bio" name="bio" type="textarea" placeholder="A short bio..." onChange={handleInputChange}/>
              <ImageUploadField label="Profile Picture" name="avatar" onChange={handleImageChange} />
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
    </div> 
  )
      
};

export default EditUserProfileForm;

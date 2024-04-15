// ProductDescriptionForm.js
import React from 'react';
import InputField from './InputField'
import SelectField from './SelectField';
import ImageUploadField from './ImageUploadField';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ProductDescriptionForm = () => {
  let AuthTokens=useSelector(state=>state.AuthTokens)
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    price: '',
    images: []
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...formData.images, ...e.target.files] });
  };
  const validateForm = () => {
    if (!formData.title) {
      toast.error("Please enter a product title.");
      return false;
    }
    if (!formData.type) {
      toast.error("Please select a product category.");
      return false;
    }
    if (!formData.description) {
      toast.error("Please enter a product description.");
      return false;
    }
    if (!formData.price) {
      toast.error("Please enter a price.");
      return false;
    }
    if (formData.images.length === 0) {
      toast.error("Please upload at least one product image.");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'images') {
        value.forEach((file) => data.append(`images`, file));
      } else {
        data.append(key, value);
      }
    }
  
    // Log data for verification
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    console.log(data)
    // Send data to your backend API
    try {
      const response = await fetch('http://127.0.0.1:8000/api/listproduct/', {
        method: 'POST',
        headers:{
          // 'Content-Type':'application/json',
          'Authorization':'Bearer '+ String(AuthTokens.access)
        },
        body: data,
        
        // Note: When using FormData, you should not set Content-Type header manually
        // The browser will set it automatically with the correct boundary string
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData);  // Or handle the response data as needed
      toast.success('Product posted successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error posting product');
    }
  };
  
  return (
    <div className="w-3/4 p-2 py-4">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 " onSubmit={handleSubmit}>
        <InputField label="Product title" name="title" type="text" placeholder="Product name" onChange={handleInputChange} />
        <SelectField label="Category" name="type" options={['School Resource', 'Other']} onChange={handleInputChange} />
        {/* <InputField label="Product sub title" name="subtitle" type="text" /> */}
       
        <SelectField label="Condition" name="state" options={['New', 'Used']} onChange={handleInputChange}/>
        <InputField label="Product description" name="description" type="textarea" onChange={handleInputChange}/>
        <InputField label="Price" name="price" type="text" placeholder="Enter price" isCurrency={true} onChange={handleInputChange}/>

        <ImageUploadField label="Product Images" name="images" onChange={handleImageChange} multiple />
      
        {/* Add more fields as necessary */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDescriptionForm;


import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import ImageUploadField from './ImageUploadField';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
// import { AuthTokens } from '../utils/reducers';

const EditProductForm = () => {
  let AuthTokens = useSelector(state => state.AuthTokens);
  const selectedProduct = useSelector(state => state.currentProduct); // Accessing selected product from Redux
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    images: []
  });

  // Update form state when the selected product changes
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        category: selectedProduct.category,
        description: selectedProduct.description,
        price: selectedProduct.price,
        images: selectedProduct.images,
        id:selectedProduct.id
      });
    }
    console.log(formData)
  }, [selectedProduct]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    // Implementation for image upload handling
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/edit-product/${formData.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthTokens}`, // Replace with your JWT access token
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        toast.success('Product updated successfully');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('An error occurred while updating the product');
    }
  };
  

  return (
    <div  className="w-3/4 p-2 py-4" >
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 " onSubmit={handleSubmit}>
        <InputField 
          label="Title" 
          name="title" 
          type="text" 
          value={formData.name} 
          onChange={handleInputChange} 
        />
        <SelectField 
          label="Category" 
          name="category" 
          options={['Electronics', 'Apparel', 'Books']} 
          value={formData.category} 
          onChange={handleInputChange} 
        />
        <InputField 
          label="Description" 
          name="description" 
          type="textarea" 
          value={formData.description} 
          onChange={handleInputChange} 
        />
        <InputField 
          label="Price" 
          name="price" 
          type="number" 
          value={formData.price} 
          onChange={handleInputChange} 
        />
        <ImageUploadField 
          label="Images" 
          name="images" 
          onChange={handleImageChange} 
          multiple 
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductForm;

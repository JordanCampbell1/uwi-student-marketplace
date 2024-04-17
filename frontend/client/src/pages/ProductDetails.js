import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBarWithCart from '../components/NavBarWithCart';

function ProductDetails() {
  const { productId } = useParams(); // Get the product ID from URL params
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = 'http://localhost:8000';
  const imageUrl = product.images.length > 0 
  ? `${baseURL}${product.images[0].image}` 
  : 'path/to/placeholder/image.jpg'; // Placeholder image path

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        console.log(data)
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]);
 
  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>No product found!</p>;

  return (
    <div className="w-[100vw] h-[100vh] relative">
       <NavBarWithCart/>
       <div className="h-[80vh] w-full overflow-y-auto">
          <div className="p-[64px] w-full h-[50vh]  flex">
            <div className='h-[50vh] w-1/2 border border-black'>
              <img 
                className="object-cover w-full h-full rounded-t-lg"  // Fixed height for images
                src={imageUrl} 
                alt={product.name} 
              />
            </div>
            <div className='h-[50vh] w-1/2 border border-black'>
              <h1>{product.name}</h1>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
              
            </div>
          </div>
          
        </div>
    
     
    </div>
  );
}

export default ProductDetails;

// ProductContainer.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductContainer = ({ products }) => {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductContainer;

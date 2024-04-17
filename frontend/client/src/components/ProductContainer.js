// ProductContainer.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductContainer = ({ products }) => {


  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-black border gap-0 p-[64px]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductContainer;

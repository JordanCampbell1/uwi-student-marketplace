// ProductCard.jsx
const ProductCard = ({ product }) => {
    return (
      <div className="flex flex-col items-center bg-white rounded-lg border shadow-md hover:bg-gray-100">
        <img className="object-cover w-full rounded-t-lg" src={product.imageUrl} alt={product.name} />
        <div className="p-4 w-full">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{product.name}</h5>
          <p className="mb-3 font-normal text-gray-700">{product.description}</p>
          <span className="text-3xl font-bold text-gray-900 mb-4">{product.price}</span>
          <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center">Add to cart</button>
        </div>
      </div>
    );
  };
  
  export default ProductCard;
  
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  let AuthTokens = useSelector(state => state.AuthTokens);
  const baseURL = 'http://localhost:8000';
  const imageUrl = product.images.length > 0 
    ? `${baseURL}${product.images[0].image}` 
    : 'path/to/placeholder/image.jpg'; // Placeholder image path

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const addProductToCart = async (productId) => {
    const response = await fetch('http://127.0.0.1:8000/api/add-to-cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(AuthTokens.access),
      },
      body: JSON.stringify({ product_id: productId }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg border shadow-md hover:bg-gray-100 w-64"> {/* Fixed width */}
      <img 
        className="object-cover w-full h-48 rounded-t-lg"  // Fixed height for images
        src={imageUrl} 
        alt={product.name} 
      />
      <div className="p-2 w-full">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 overflow-ellipsis overflow-hidden whitespace-nowrap">{product.name}</h5> {/* Truncate long names */}
        <p className="mb-3 font-normal text-gray-700 line-clamp-3">{product.description}</p> {/* Limit description lines */}
        <span className="text-xl font-bold text-gray-900 mb-2">{formattedPrice}</span>
        <button onClick={() => addProductToCart(product.id)} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  let AuthTokens = useSelector(state => state.AuthTokens);
  let navigate=useNavigate()
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
  const goToProductDetails = () => {
    navigate(`/products/${product.id}`); // Navigate to product details
  };
  return (
    <div className="flex flex-col items-center bg-white rounded-lg border border-black shadow-md hover:bg-gray-100 w-64 p-4"> {/* Fixed width */}
      <img 
        className="object-contain w-full h-48 rounded-t-lg"  // Fixed height for images
        src={imageUrl} 
        alt={product.name} 
        onClick={goToProductDetails}  
      />
      <div className="p-2 w-full">
        <span className="text-md font-semibold text-gray-900 mb-4">{formattedPrice}</span>
        <h5 className="mb-3 text-lg tracking-tight text-gray-900 overflow-ellipsis overflow-hidden whitespace-nowrap">{product.name}</h5> {/* Truncate long names */}
        {/* <p className="mb-3 font-normal text-gray-700 line-clamp-3">{product.description}</p> Limit description lines */}
        
        <button onClick={() => addProductToCart(product.id)} className="text-white bg-red-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

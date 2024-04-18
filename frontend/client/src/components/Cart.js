import CartCard from "./CartCard";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Cart=({ hideCart, isClosing })=>{  
  let AuthTokens=useSelector(state=>state.AuthTokens)
  const [products, setProducts] = useState([]);

      useEffect(() => {
          const fetchUserCart = async () => {
              try {
                  const response = await fetch('http://127.0.0.1:8000/api/cart/', { // Replace with your actual API endpoint
                      method: 'GET',
                      
                      headers: {
                        
                        'Authorization':'Bearer '+ String(AuthTokens.access)

                      },
                  });

                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }

                  const cartData = await response.json();
                  setProducts(cartData.products); // Assuming the API returns a field `products`
              } catch (error) {
                  console.error('Error fetching cart:', error);
              }
          };

          fetchUserCart();
      }, []);
      return (
        <div className={`fixed right-0 top-0 h-full w-[15%] z-[200] bg-white pt-2 shadow-md ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}`}>
            <div className="w-full flex h-[6%] items-center px-2">
              <button onClick={hideCart} className="text-red-500"><CloseOutlinedIcon/></button>
              <h1 className="ml-[25%]">Shopping Cart</h1>
            </div>
            {/* Add a button to hide the cart */}
          
            {products.map((product) => (
                <CartCard key={product.id} product={product} />
            ))}
        </div>
    )
}
export default Cart
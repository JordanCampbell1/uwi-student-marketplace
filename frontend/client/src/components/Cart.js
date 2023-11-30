import CartCard from "./CardCard";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const Cart=({ hideCart, isClosing })=>{
    const products = [
        {
          id: 1,
          name: "Product 1",
          description: "Description for product 1",
          price: "$25.00",
          imageUrl: "https://www.raymondgeddes.com/cdn/shop/articles/iStock-1311273895_1.jpg?v=1682319188",
        },
        {
            id: 1,
            name: "Product 1",
            description: "Description for product 1",
            price: "$25.00",
            imageUrl: "https://www.raymondgeddes.com/cdn/shop/articles/iStock-1311273895_1.jpg?v=1682319188",
          },
          {
            id: 1,
            name: "Product 1",
            description: "Description for product 1",
            price: "$25.00",
            imageUrl: "https://www.raymondgeddes.com/cdn/shop/articles/iStock-1311273895_1.jpg?v=1682319188",
          },
        // ...other products
      ];
      return (
        <div className={`fixed right-0 top-0 h-full w-[15%] z-100 bg-white pt-2 shadow-md ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}`}>
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
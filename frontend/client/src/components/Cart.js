import CartCard from "./CardCard";

const Cart=()=>{
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
    return(
        <div className="fixed right-0 top-0 h-full w-[15%] z-100 bg-white pt-2 shadow-md">
            <h1 className="w-full text-center">Shopping Cart</h1>
            {products.map((product) => (
                <CartCard key={product.id} product={product} />
            ))}

        </div>
    )
}
export default Cart
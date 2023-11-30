import React from "react";
import NavBar from "../components/Navbar";
import AltBar from "../components/AltBar";
import Carousel from "../components/Carousel";
import ProductContainer from "../components/ProductContainer";
import Cart from "../components/Cart";
import { useState } from "react";
import NavBarWithCart from "../components/NavBarWithCart";

const HomePage=()=>{
    // const [isCartVisible, setCartVisible] = useState(false);
    // const [isClosing, setIsClosing] = useState(false);

    // const handleCloseCart = () => {
    //     setIsClosing(true);
    //     setTimeout(() => {
    //         setCartVisible(false);
    //         setIsClosing(false);
    //     }, 500); // This should match the duration of your animation
    // };
    const images=[
        "https://www.raymondgeddes.com/cdn/shop/articles/iStock-1311273895_1.jpg?v=1682319188",
        "https://simplewordsoffaith.com/wp-content/uploads/2022/08/Back-to-school-Must-have-school-supplies.jpg"
    ]
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
        <div className="w-[100vw] h-[100vh] relative">
          <NavBarWithCart/>
          <div className="h-[80vh] w-full overflow-y-auto">
            <Carousel width="100vw" height="50dvh" images={images} />
            <ProductContainer products={products} />

          </div>
    

        </div>
    )
}

export default HomePage
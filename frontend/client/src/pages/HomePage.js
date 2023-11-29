import React from "react";
import NavBar from "../components/Navbar";
import AltBar from "../components/AltBar";
import Carousel from "../components/Carousel";
import ProductContainer from "../components/ProductContainer";


const HomePage=()=>{
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
        <div className="w-[100vw] h-[100vh]">
            <NavBar/>
            <AltBar/>
            <Carousel width="100%" height="50%" images={images} />
            <ProductContainer products={products} />

        </div>
    )
}

export default HomePage
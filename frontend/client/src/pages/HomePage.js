import React from "react";
import NavBar from "../components/Navbar";
import AltBar from "../components/AltBar";
import Carousel from "../components/Carousel";
import ProductContainer from "../components/ProductContainer";
import Cart from "../components/Cart";
import { useState } from "react";
import NavBarWithCart from "../components/NavBarWithCart";
import { useEffect } from "react";
const HomePage=()=>{
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);
    const images=[
        "https://www.raymondgeddes.com/cdn/shop/articles/iStock-1311273895_1.jpg?v=1682319188",
        "https://simplewordsoffaith.com/wp-content/uploads/2022/08/Back-to-school-Must-have-school-supplies.jpg"
    ]
    
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
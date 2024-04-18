import React from "react";
import NavBar from "../components/Navbar";
import AltBar from "../components/AltBar";
import Carousel from "../components/Carousel";
import ProductContainer from "../components/ProductContainer";
import Cart from "../components/Cart";
import { useState } from "react";
import NavBarWithCart from "../components/NavBarWithCart";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
const HomePage=()=>{
  const [products, setProducts] = useState([]);
  const queryResults=useSelector(state => state.queryResults)
  const baseURL = 'http://localhost:8000';
  const navigate= useNavigate()
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
    useEffect(()=>{
      console.log(queryResults)
    },[queryResults])
    return(
        <div className="w-[100vw] h-[100vh] relative">
          <NavBarWithCart/>
          {queryResults?
            <div className="h-[80vh] w-full overflow-y-auto p-[64px] flex flex-col gap-2">
              {queryResults.map((item) => (
                <div key={item.id} className="w-full h-[20vh] flex">
                  <img src={item.images.length > 0 
    ? `${baseURL}${item.images[0].image}` 
    : 'path/to/placeholder/image.jpg'} alt={item.name} className="h-3/4 w-[20%] object-contain"
    onClick={()=>navigate(`products/${item.id}`)}
    />
                 
                  <div className="h-full flex flex-col">
                    <p className="ml-2 text-xl font-semibold text-gray mb-2">{item.name}</p>
                    <Rating name="customized-10 " defaultValue={item.average_rating} max={5} readOnly/>
                    <p className="ml-1 mt-2">${item.price}</p>
                    <p className="ml-1">Sold by {item.owner.first_name} {item.owner.last_name}</p>
                  </div>
                </div>
              ))}
            </div>:
            <div className="h-[80vh] w-full overflow-y-auto">
             <Carousel width="100vw" height="50dvh" images={images} />
             <ProductContainer products={products} />
 
           </div>
          }
         
    

        </div>
    )
}

export default HomePage
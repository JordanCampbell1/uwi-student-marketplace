import React, { useEffect, useState } from 'react';
import NavBarWithCart from "../components/NavBarWithCart";
// import EditProductCard from "../components/EditProductCard";
import EditProductCard from '../components/EditproductCard';
import { useSelector } from 'react-redux';

const MyListings = () => {
    const [userProducts, setUserProducts] = useState([]);
    const AuthTokens = useSelector(state => state.AuthTokens);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8000/api/my-products/', {
                headers: {
                    'Authorization': 'Bearer ' + String(AuthTokens.access),
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserProducts(data);
            }
        };
        fetchProducts();
    }, [AuthTokens]);

    return (
        <div className="w-full h-full relative"> 
          <NavBarWithCart/>
          <div className="grid grid-cols-5 gap-4 p-4"> {/* Grid of 5 columns */}
            {userProducts.map(product => (
              <EditProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
    );
}

export default MyListings;

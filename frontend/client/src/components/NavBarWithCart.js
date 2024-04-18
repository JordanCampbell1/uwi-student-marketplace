import React, { useState } from 'react';
import NavBar from "./Navbar";
import Cart from "./Cart";
import AltBar from './AltBar';
import { useNavigate } from 'react-router-dom';

const NavBarWithCart = () => {
    const [isCartVisible, setCartVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const navigate= useNavigate()

    const handleCloseCart = () => {
        setIsClosing(true);
        setTimeout(() => {
            setCartVisible(false);
            setIsClosing(false);
        }, 500);
    };

    const toggleCart = () => setCartVisible(!isCartVisible);

    return (
        <div className='w-full'>
            <NavBar toggleCart={toggleCart} />
            <AltBar/>
            {isCartVisible && <Cart hideCart={handleCloseCart} isClosing={isClosing} />}
        </div>
    );
};

export default NavBarWithCart;

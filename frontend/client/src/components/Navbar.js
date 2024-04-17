import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'; // Adjust the path as needed
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import debounce from 'lodash.debounce';

const NavBar = ({ toggleCart }) => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Debounce function to limit the number of API calls
    const debouncedSearch = debounce(async (searchTerm) => {
        if (searchTerm) {
            const response = await fetch(`http://localhost:8000/api/search-products/?query=${encodeURIComponent(searchTerm)}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                console.error('Search failed');
            }
        } else {
            setSearchResults([]);
        }
    }, 300);

    useEffect(() => {
        debouncedSearch(searchTerm);

        // Cleanup function to cancel debounced calls
        return () => debouncedSearch.cancel();
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        // Delay hiding results to allow interaction with them
        setTimeout(() => setIsFocused(false), 200);
    };

    return (
        <nav className="w-full h-[12vh] border-b border-gray-200 bg-white relative">
            <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center cursor-pointer " onClick={()=>navigate('/')}>
                    <img src={logo} alt="Logo" className="h-12" />
                    {/* <span className="font-bold text-xl ml-2">UWI STUDENT MARKETPLACE</span> */}
                </div>
                <form className="flex-1 max-w-xl relative" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="search"
                        name="search"
                        placeholder="Search for items, categories, etc."
                        className="w-full h-10 pl-4 pr-10 py-2 border rounded-full text-sm leading-5 bg-gray-100 focus:outline-none focus:bg-white focus:border-red-300"
                        onChange={handleSearchChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        autoComplete="off"
                    />
                    {/* Search Icon */}
                    <button type="submit" className="absolute right-2 top-0 mt-2 mr-4">
                        {/* Icon Component */}
                        Search
                    </button>
                </form>
                <div className="flex items-center gap-4">
                    {/* Profile Icon with Dropdown */}
                    <div className="relative focus:outline-none">
                        <button onClick={() => setShowDropdown(!showDropdown)}>
                            <PersonOutlinedIcon />
                        </button>
                        {showDropdown && (
                            <div ref={dropdownRef} className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                <a onClick={() => navigate('/edit')} className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                                    Edit Account
                                </a>
                                <a onClick={() => navigate('/list')} className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                                    List Item
                                </a>
                                <a onClick={() => navigate('/my-listings')} className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                                    My Listings
                                </a>
                                {/* Additional dropdown items can be added here */}
                            </div>
                        )}
                    </div>
                    {/* Cart Icon */}
                    <button onClick={toggleCart} className="relative focus:outline-none">
                        <ShoppingCartOutlinedIcon />
                        {/* Notification Badge */}
                    </button>
                </div>
            </div>
            {/* Search Results */}
            {isFocused && searchTerm && (
                <div className="absolute bottom-0 w-full bg-white z-10">
                    {/* Search Results Component */}
                </div>
            )}
        </nav>
    );
}

export default NavBar;

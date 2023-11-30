import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.png'; // Adjust the path as needed

const NavBar = () => {
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.search.value;
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <nav className="w-full h-[12vh] border-b border-gray-200 bg-white ">
            <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-12"/>
                    <span className="font-bold text-xl ml-2">UWI STUDENT MARKETPLACE</span>
                </div>
                <form onSubmit={handleSearch} className="flex-1 max-w-xl relative">
                    <input
                        type="search"
                        name="search"
                        placeholder="Search for items, categories, etc."
                        className="w-full h-10 pl-4 pr-10 py-2 border rounded-full text-sm leading-5 bg-gray-100 focus:outline-none focus:bg-white focus:border-red-300"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-0 mt-2 mr-4"
                    >
                        {/* Search Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    </button>
                </form>
                <div className="flex items-center gap-4">
                    {/* Profile Icon */}
                    <button onClick={() => navigate('/profile')} className="focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                   
                    </button>
                    {/* Cart Icon */}
                    <button onClick={() => navigate('/cart')} className="relative focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                        <span className="absolute right-0 bottom-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-xs flex items-center justify-center">3</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;

import React from "react";


const AltBar=()=>{
    return(
        <div className="w-full h-[8vh] bg-red-600">
            <ul className="flex w-3/4 h-[100%] items-center px-4 gap-4 text-white">
                <li>Categories</li>
                <li>What's New</li>
                <li>Books</li>
                <li>Technology</li>
                <li>Other Resources</li>
            </ul>
        </div>
    )
}

export default AltBar
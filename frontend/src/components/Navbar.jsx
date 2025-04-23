import React from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext'; 
// className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
const Navbar = () => {
   const { isDarkMode } = useTheme();
  return (
    <nav className={` shadow-md ${isDarkMode ? 'bg-gray-800 ' : 'bg-black text-white'}`}>
      <div className="container  p-2 mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Spam Detection</h1>
        <div className='flex flex-row gap-4'>
          <a href="/" className="text-white bg-black border border-white hover:border-blue-500 hover:text-blue-300  py-2 rounded-md hover:rounded-blue-700 transition px-4">Home</a>
          <a href="" className="text-white bg-black border border-white hover:border-blue-500 hover:text-blue-300  py-2 rounded-md hover:rounded-blue-700 transition px-4">About</a>
          {/* <a href="#" className="text-white hover:text-blue-300 px-4">Contact</a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

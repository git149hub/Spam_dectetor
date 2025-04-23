// src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
    
   
  return (
    <button
      onClick={toggleTheme}
      className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-2 px-4 rounded-lg shadow-md"
    >
      Toggle to {isDarkMode? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggle;

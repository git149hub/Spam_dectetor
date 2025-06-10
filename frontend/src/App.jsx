import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EmailAnalyzerCard from './components/EmailAnalyzerCard';
import ThemeToggle from './components/ThemeToggle'; 
import { ThemeProvider, useTheme } from './context/ThemeContext'; // Add ThemeProvider & useTheme
import { TypeAnimation } from 'react-type-animation';

// Inner App that uses the Theme Context
const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={"min-h-screen min-w-screen transition-colors duration-500 "}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className={`container min-h-screen overflow-hidden min-w-screen mx-auto py-10 px-4 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
        }`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Section: Introduction Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-4">Welcome to Spam Detection Tool</h2>


            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                `Paste your email content in the box below and let us determine if it's spam or ham!
              We continuously check for spam or ham content in emails.`,
                1000,
                '' ,// wait 1s before deleting the text reverse typing
                500
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '2em', display: 'inline-block' }}
              repeat={Infinity}
            />

          </div>

          {/* Right Section: EmailAnalyzerCard */}
          <div>
            <EmailAnalyzerCard />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Theme Toggle Button */}
      {/* <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div> */}
    </div>
  );
};

// Final App wrapped in ThemeProvider
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;

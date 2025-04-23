import React, { useState, useRef } from 'react';
import ThemeToggle from './ThemeToggle';

const EmailAnalyzerCard = () => {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);

    const resultRef = useRef(null);






    const handleAnalyze = async () => {
        if (!message.trim()) {
            alert('Please enter a message before analyzing.');
            return;
        }

        try {
            // Call the backend API
            const response = await fetch('https://spam-dectetor-backend.onrender.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });

            // Get the prediction result from the response
            const data = await response.json();

            // Extract the final prediction result
            const prediction = data.final_prediction; // 'Spam' or 'Ham'

            // Set the result and show it
            setResult(prediction);
            setShowResult(true);

            // Auto-hide result after 5 seconds
            setTimeout(() => {
                setShowResult(false);
            }, 5000);

            // Clear the message input after 5 seconds
            setTimeout(() => {
                setMessage('');
            }, 5000);

        } catch (error) {
            console.error('Error during prediction:', error);
            alert('Something went wrong. Please try again later.');
        }
    };








    const handleCopy = () => {
        try {
            if (resultRef.current) {
                navigator.clipboard.writeText(resultRef.current.innerText);
                alert('Result copied to clipboard!');
            }
        } catch (error) {
            console.error('Clipboard copy failed:', error);
            alert('Failed to copy. Try again.');
        }
    };






    return (
        <div className="bg-white text-black rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto dark:bg-gray-800 dark:text-white transition-all">
            <h2 className="text-2xl font-semibold mb-4">Email Analyzer</h2>

            <textarea
                className="w-full h-40 p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder=" Enter your email here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                onClick={handleAnalyze}
            >
                Analyze
            </button>

            {showResult && (
                <div
                    className={`mt-4 text-lg w-full py-2 font-semibold rounded-md text-center bg-green-700 transition${result === 'Spam' ? 'text-red-500' : 'text-green-500'
                        }`}
                >
                    ✉️ Prediction: {result}
                </div>
            )}
            {/* Word Count */}
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                Word Count: {message.trim() === '' ? 0 : message.trim().split(/\s+/).length}
            </div>

            {/* Copy Button */}

            {showResult && (
                <div className="mt-4 text-center">
                    <div ref={resultRef} className="hidden">
                        {result}
                    </div>

                    <button
                        onClick={handleCopy}
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                    >
                        Copy Result
                    </button>
                </div>
            )}



            {/* Toggle Button */}
            <div className="mt-4 text-center">

                <ThemeToggle />
                <div className='py-2 text-sm'>
                    Made with ❤️ by sahil
                </div>

            </div>
        </div>
    );
};

export default EmailAnalyzerCard;

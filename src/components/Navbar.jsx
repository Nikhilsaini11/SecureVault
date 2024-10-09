import React from 'react'
import Logo from './Logo'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

    const generatePassword = (length = 12) => {
        let charset = "";
        let newPassword = "";

        charset += "!@#$%^&*()";
        charset += "0123456789";
        charset += "abcdefghijklmnopqrstuvwxyz";
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        return newPassword
    };

    const handleExport = () => {
        // Step 1: Retrieve the array from localStorage
        const data = JSON.parse(localStorage.getItem('passwords')) || [];
    
        // Step 2: Convert the array to a JSON string
        const jsonString = JSON.stringify(data, null, 2); // Indent for readability
    
        // Step 3: Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });
    
        // Step 4: Create a link to download the Blob as a file
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'SecureVault.json'; // Set the file name
        document.body.appendChild(a); // Append link to body
        a.click(); // Programmatically click the link to trigger download
        document.body.removeChild(a); // Remove the link after downloading
        URL.revokeObjectURL(url); // Clean up the URL object
      };

    const handleGeneratePassword = () => {
        const password = generatePassword();
        navigator.clipboard.writeText(password);
        toast('Generated & Copied!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    };


    return (


        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side - Logo */}
                <div className="flex items-center mx-8">
                    <Logo /> {/* Your SecureVault Logo */}
                </div>

                {/* Right side - Additional buttons */}
                <div className="flex space-x-4 mx-8">
                    {/* Generate Password Button */}
                    <button onClick={handleGeneratePassword} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none">
                        Generate Password
                    </button>

                    {/* Export Button */}
                    <button onClick={handleExport} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none">
                        Export
                    </button>

                    {/* Profile Icon */}
                    <div className="relative">
                        <button className="focus:outline-none">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5.121 17.804A7.962 7.962 0 0112 15a7.962 7.962 0 016.879 2.804M12 11a4 4 0 110-8 4 4 0 010 8zm0 2c-5.523 0-10 2.239-10 5v1a1 1 0 001 1h18a1 1 0 001-1v-1c0-2.761-4.477-5-10-5z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar

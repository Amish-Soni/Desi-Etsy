// src/components/ArtisanRegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faUser, faEnvelope, faLock, faPalette } from '@fortawesome/free-solid-svg-icons';

const ArtisanRegisterPage = ({ onArtisanRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call.
    // Here, we're simulating it.
    const newArtisan = {
      id: Date.now(), // Simple unique ID
      name,
      specialty,
      email,
      location: "New Artisan Location", // Placeholder
      image: 'https://via.placeholder.com/400x400.png?text=' + name.charAt(0), // Placeholder image
      rating: 0,
      role: 'artisan', // IMPORTANT: Define user role
    };
    onArtisanRegister(newArtisan);
    navigate('/dashboard'); // Redirect to dashboard after registration
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <a href="/" className="flex items-center justify-center">
              <FontAwesomeIcon icon={faStore} className="text-indigo-600 text-3xl mr-3" />
              <span className="text-3xl font-bold text-indigo-600">DesiCrafts</span>
            </a>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6">Become an Artisan</h2>
            <p className="text-gray-600 mt-2">Join our community and sell your crafts.</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-10 text-gray-400" />
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-gray-700" placeholder="John Doe" required />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialty">Your Specialty (e.g., Pottery)</label>
              <FontAwesomeIcon icon={faPalette} className="absolute left-3 top-10 text-gray-400" />
              <input id="specialty" type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-gray-700" placeholder="Wood Carving, Textiles, etc." required />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-10 text-gray-400" />
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-gray-700" placeholder="you@example.com" required />
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-10 text-gray-400" />
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-gray-700" placeholder="••••••••••" required />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg">
              Create My Artisan Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtisanRegisterPage;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const AuthPage = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Dummy form submission handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials against a backend API here.
    console.log('Logging in with:', { email, password });
    // For this demo, we'll just simulate a successful login.
    onLoginSuccess();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send registration data to a backend API.
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Registering with:', { name, email, password });
    // For this demo, we'll simulate a successful registration and login.
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
            <a href="#" className="flex items-center justify-center">
              <FontAwesomeIcon icon={faStore} className="text-indigo-600 text-3xl mr-3" />
              <span className="text-3xl font-bold text-indigo-600">
                DesiCrafts
              </span>
            </a>
            <p className="text-gray-600 mt-2">Your portal to authentic handcrafted treasures.</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex border-b mb-6">
            <button
              onClick={() => setIsLoginView(true)}
              className={`w-1/2 py-3 text-center font-semibold transition-colors duration-300 ${isLoginView ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLoginView(false)}
              className={`w-1/2 py-3 text-center font-semibold transition-colors duration-300 ${!isLoginView ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {isLoginView ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-email">Email Address</label>
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-10 text-gray-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-sm appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="mb-6 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">Password</label>
                 <FontAwesomeIcon icon={faLock} className="absolute left-3 top-10 text-gray-400" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-sm appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <a href="#" className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
              >
                Sign In
              </button>
            </form>
          ) : (
            // Registration Form
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="register-name">Full Name</label>
                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-10 text-gray-400" />
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow-sm appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="register-email">Email Address</label>
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-10 text-gray-400" />
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-sm appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="register-password">Password</label>
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-10 text-gray-400" />
                <input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-sm appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••••"
                  required
                />
              </div>
              <div className="mb-6 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">Confirm Password</label>
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-10 text-gray-400" />
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="shadow-sm appearance-none border rounded-lg w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
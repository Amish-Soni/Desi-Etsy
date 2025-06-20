// src/components/ArtisanDashboard.jsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faBoxOpen, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard'; // We can reuse this!

const ArtisanDashboard = ({ currentUser, products, onAddProduct, renderStars }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('home-decor'); // Default category

  // In a real app, you wouldn't need these dummy handlers inside the dashboard
  const dummyHandler = () => console.log("Action not implemented for dashboard card.");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !categoryId) {
      alert("Please fill all fields.");
      return;
    }
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      categoryId,
      artisan: currentUser.name, // Link product to the logged-in artisan
      location: currentUser.location,
      image: 'https://via.placeholder.com/400x400.png?text=New+Product', // Placeholder
      rating: 0,
      reviews: 0,
    };
    onAddProduct(newProduct);
    // Clear form
    setName('');
    setPrice('');
  };
  
  // Filter products to show only those by the current artisan
  const artisanProducts = products.filter(p => p.artisan === currentUser.name);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {currentUser.name}!</h1>
      <p className="text-gray-600 mb-8">This is your dashboard. You can add and manage your products here.</p>
      
      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FontAwesomeIcon icon={faPlusCircle} className="mr-3 text-indigo-500" />
          Add a New Product
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} className="p-2 border rounded" required />
          <input type="number" placeholder="Price ($)" value={price} onChange={e => setPrice(e.target.value)} className="p-2 border rounded" required />
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="p-2 border rounded">
            <option value="pottery">Pottery</option>
            <option value="textiles">Textiles</option>
            <option value="jewelry">Jewelry</option>
            <option value="woodwork">Woodwork</option>
            <option value="paintings">Paintings</option>
            <option value="home-decor">Home Decor</option>
          </select>
          <button type="submit" className="md:col-span-3 w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700">Add Product</button>
        </form>
      </div>

      {/* Artisan's Products List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FontAwesomeIcon icon={faBoxOpen} className="mr-3 text-indigo-500" />
          Your Products
        </h2>
        {artisanProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artisanProducts.map(product => (
              // You can enhance ProductCard to have edit/delete buttons visible only here
              <ProductCard 
                key={product.id}
                product={product}
                isInWishlist={false} // Not relevant here
                onAddToCart={dummyHandler}
                onToggleWishlist={dummyHandler}
                renderStars={renderStars}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't added any products yet. Use the form above to get started!</p>
        )}
      </div>
    </div>
  );
};

export default ArtisanDashboard;
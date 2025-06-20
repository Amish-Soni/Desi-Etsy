// src/App.jsx

import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// Page & Component Imports
import AuthPage from './AuthPage';
import HomePage from './HomePage';
import ArtisanRegisterPage from './components/ArtisanRegisterPage';
import ArtisanDashboard from './components/ArtisanDashboard';
import Header from './components/Header';
import CartModal from './components/CartModal';
import WishlistModal from './components/WishlistModal';

// Data and Icon Imports
import { initialProducts, initialArtisans, initialCategories } from './data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    // ---- GLOBAL STATE ----
    const [products, setProducts] = useState(initialProducts);
    const [artisans, setArtisans] = useState(initialArtisans);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Search state is now global
    
    // Cart and Wishlist
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    // ---- GLOBAL HANDLERS ----
    const handleLoginSuccess = () => {
        // In a real app, you'd get user data from an API.
        // We'll simulate a regular customer login.
        setCurrentUser({ id: 1, name: "Valued Customer", role: "customer" });
    };

    const handleLogout = () => setCurrentUser(null);
    
    const handleArtisanRegister = (newArtisan) => {
        setArtisans(prev => [...prev, newArtisan]);
        setCurrentUser(newArtisan); // Automatically log in the new artisan
    };
    
    const handleAddProduct = (newProduct) => {
        setProducts(prev => [...prev, newProduct]);
    };

    const handleAddToCart = (productId) => {
        setCart((prev) => {
            const existing = prev.find(item => item.productId === productId);
            if (existing) return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item);
            return [...prev, { productId, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart on add
    };

    const handleUpdateCartQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) { handleRemoveFromCart(productId); }
        else { setCart(cart.map(item => item.productId === productId ? { ...item, quantity: newQuantity } : item)); }
    };

    const handleRemoveFromCart = (productId) => setCart(cart.filter(item => item.productId !== productId));

    const handleToggleWishlist = (productId) => {
        setWishlist((prev) => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
    };
    
    const handleMoveToCart = (productId) => {
        handleAddToCart(productId);
        handleToggleWishlist(productId);
    };

    const totalCartItems = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <>
                {[...Array(fullStars)].map((_, i) => <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-400" />)}
                {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400" />}
                {[...Array(emptyStars)].map((_, i) => <FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-gray-300" />)}
            </>
        );
    };

    // --- RENDER LOGIC ---
    if (!currentUser) {
        // The AuthPage now handles both login and links to artisan registration
        // We can pass a prop to AuthPage to show the artisan link.
        // For now, let's assume the user can find the artisan registration page via URL or a future link on AuthPage.
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 overflow-x-hidden">
                <Header
                    currentUser={currentUser}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    totalCartItems={totalCartItems}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    onLogout={handleLogout}
                    onNavClick={(e, id) => { /* Handle nav clicks if needed globally */ }}
                    onCartClick={() => setIsCartOpen(true)}
                    onWishlistClick={() => setIsWishlistOpen(true)}
                />
                
                <main>
                    <Routes>
                        <Route path="/" element={
                            <HomePage 
                                allArtisans={artisans}
                                allProducts={products}
                                categories={initialCategories}
                                wishlist={wishlist}
                                handleAddToCart={handleAddToCart}
                                handleToggleWishlist={handleToggleWishlist}
                                renderStars={renderStars}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        }/>
                        <Route path="/register-artisan" element={
                            <ArtisanRegisterPage onArtisanRegister={handleArtisanRegister} />
                        }/>
                        <Route path="/dashboard" element={
                            currentUser.role === 'artisan' ? (
                                <ArtisanDashboard 
                                    currentUser={currentUser}
                                    products={products}
                                    onAddProduct={handleAddProduct}
                                    renderStars={renderStars}
                                />
                            ) : (
                                <Navigate to="/" /> // Redirect if not an artisan
                            )
                        }/>
                        {/* You can add more routes here later */}
                    </Routes>
                </main>
                
                <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} products={products} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart}/>
                <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} wishlistIds={wishlist} products={products} onRemoveFromWishlist={handleToggleWishlist} onMoveToCart={handleMoveToCart}/>
            </div>
        </Router>
    );
};

export default App;
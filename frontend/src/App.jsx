import React, { useState, useMemo } from "react";
import AuthPage from './AuthPage';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import ArtisanCard from './components/ArtisanCard';
import CartModal from './components/CartModal';
import WishlistModal from './components/WishlistModal';
import './index.css';

// Product Images
import pro1 from './assets/pro1.jpg';
import pro2 from './assets/pro2.jpg';
import pro3 from './assets/pro3.jpg';
import pro4 from './assets/pro4.jpg';
import pro5 from './assets/pro5.jpg';
import pro6 from './assets/pro6.jpg';
import pro7 from './assets/pro7.jpg';
import pro8 from './assets/pro8.jpg';

// Artisan Images
import artisan1 from './assets/a1.jpg';
import artisan2 from './assets/a2.jpg';
import artisan3 from './assets/a3.jpg';
import artisan4 from './assets/a4.jpg';

// Customer images 
import customer1 from './assets/c1.jpg';
import customer2 from './assets/c2.jpg';
import customer3 from './assets/c3.jpg';

// Main image
import mainImage from './assets/p1.jpg';

// Icon Imports needed for App.jsx itself
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faSearch, faHeart, faArrowRight, faFilter, faTimes, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faPinterest, faCcVisa, faCcMastercard, faCcPaypal, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faJar, faSocks, faGem, faTree, faPalette, faCouch } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  // =================================================================
  // STATE MANAGEMENT
  // =================================================================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [selectedRating, setSelectedRating] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // New state for controlling modal visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // =================================================================
  // DATA AND DERIVED STATE
  // =================================================================
  const categories = [
    { id: "pottery", name: "Pottery", icon: faJar },
    { id: "textiles", name: "Textiles", icon: faSocks },
    { id: "jewelry", name: "Jewelry", icon: faGem },
    { id: "woodwork", name: "Woodwork", icon: faTree },
    { id: "paintings", name: "Paintings", icon: faPalette },
    { id: "home-decor", name: "Home Decor", icon: faCouch },
  ];

  const featuredProducts = [
    { id: 1, name: "Hand-painted Ceramic Vase", description: "Beautifully crafted ceramic vase...", price: 45.99, originalPrice: 59.99, image:pro1, artisan: "Maya Sharma", location: "Jaipur, Rajasthan", rating: 4.8, reviews: 124, categoryId: 'pottery' },
    { id: 2, name: "Handwoven Cotton Scarf", description: "Soft cotton scarf...", price: 29.99, originalPrice: 39.99, image:pro2, artisan: "Ravi Patel", location: "Ahmedabad, Gujarat", rating: 4.6, reviews: 89, categoryId: 'textiles' },
    { id: 3, name: "Brass Pendant Necklace", description: "Handcrafted brass pendant...", price: 32.5, originalPrice: null, image:pro3, artisan: "Priya Verma", location: "Bhubaneswar, Odisha", rating: 4.9, reviews: 56, categoryId: 'jewelry' },
    { id: 4, name: "Wooden Elephant Sculpture", description: "Hand-carved rosewood elephant...", price: 78.5, originalPrice: 95.0, image:pro4, artisan: "Anand Kumar", location: "Mysore, Karnataka", rating: 4.7, reviews: 103, categoryId: 'woodwork' },
    { id: 5, name: "Embroidered Wall Hanging", description: "Colorful hand-embroidered wall art...", price: 65.99, originalPrice: null, image:pro5, artisan: "Lakshmi Devi", location: "Kutch, Gujarat", rating: 4.9, reviews: 78, categoryId: 'home-decor' },
    { id: 6, name: "Terracotta Wind Chimes", description: "Handmade clay wind chimes...", price: 24.99, originalPrice: 32.99, image:pro6, artisan: "Rajesh Gupta", location: "Kolkata, West Bengal", rating: 3.5, reviews: 42, categoryId: 'home-decor' },
    { id: 7, name: "Madhubani Painting", description: "Traditional Madhubani art...", price: 89.99, originalPrice: 110.0, image:pro7, artisan: "Sunita Jha", location: "Madhubani, Bihar", rating: 5.0, reviews: 67, categoryId: 'paintings' },
    { id: 8, name: "Brass Table Lamp", description: "Intricately designed brass lamp...", price: 119.99, originalPrice: 149.99, image:pro8, artisan: "Mohammed Ali", location: "Moradabad, Uttar Pradesh", rating: 2.8, reviews: 91, categoryId: 'home-decor' },
  ];

  const featuredArtisans = [
    { id: 1, name: "Maya Sharma", specialty: "Ceramic Pottery", location: "Jaipur, Rajasthan", image:artisan1, rating: 4.8 },
    { id: 2, name: "Ravi Patel", specialty: "Textile Weaving", location: "Ahmedabad, Gujarat", image:artisan2, rating: 4.6 },
    { id: 3, name: "Priya Verma", specialty: "Metal Jewelry", location: "Bhubaneswar, Odisha", image:artisan3, rating: 4.9 },
    { id: 4, name: "Anand Kumar", specialty: "Wood Carving", location: "Mysore, Karnataka", image:artisan4, rating: 4.7 },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...featuredProducts];
    if (searchQuery) { products = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()) || p.artisan.toLowerCase().includes(searchQuery.toLowerCase())); }
    if (selectedCategories.length > 0) { products = products.filter(p => selectedCategories.includes(p.categoryId)); }
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedRating) { products = products.filter(p => p.rating >= selectedRating); }
    switch (sortOption) {
      case 'price-low': products.sort((a, b) => a.price - b.price); break;
      case 'price-high': products.sort((a, b) => b.price - a.price); break;
      case 'rating': products.sort((a, b) => b.rating - a.rating); break;
      case 'newest': products.sort((a, b) => b.id - a.id); break;
      case 'featured': default: products.sort((a, b) => a.id - b.id); break;
    }
    return products;
  }, [searchQuery, selectedCategories, priceRange, selectedRating, sortOption]);

  const totalCartItems = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  // =================================================================
  // HANDLERS AND HELPERS
  // =================================================================
  const handleLoginSuccess = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const handleAddToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const handleRatingChange = (rating) => setSelectedRating(prev => (prev === rating ? null : rating));
  
  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 200]);
    setSelectedCategories([]);
    setSelectedRating(null);
    setSortOption("featured");
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };
  
  const handleNavClick = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false); 
  };

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
  
  // New handlers for modal interactions
  const handleUpdateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const handleMoveToCart = (productId) => {
    handleAddToCart(productId);
    handleToggleWishlist(productId); // This removes it from the wishlist
  };

  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // =================================================================
  // RENDER METHOD
  // =================================================================
  return (
    <div id="home" className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalCartItems={totalCartItems}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onLogout={handleLogout}
        onNavClick={handleNavClick}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] md:min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img src={mainImage} alt="Handcrafted marketplace" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Unique Handcrafted Treasures
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Support local artisans and bring authentic handmade products directly to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button onClick={(e) => handleNavClick(e, 'shop')} className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200 font-medium">Shop Now</button>
              <button onClick={(e) => handleNavClick(e, 'artisans')} className="px-6 py-3 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition duration-200 font-medium">Become an Artisan</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center cursor-pointer group" onClick={() => { toggleCategory(category.id); handleNavClick(new MouseEvent('click'), 'shop')}}>
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition duration-200">
                  <FontAwesomeIcon icon={category.icon} className="text-indigo-600 text-2xl" />
                </div>
                <span className="text-gray-700 font-medium group-hover:text-indigo-600 transition duration-200 text-center">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artisans Section */}
      <section id="artisans" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Artisans</h2>
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">View All <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} renderStars={renderStars} />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="shop" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Our Products</h2>
            <div className="flex items-center self-end md:self-auto">
              <button className="md:hidden mr-4 text-gray-700 border border-gray-300 px-3 py-1 rounded-full text-sm" onClick={() => setShowFilters(!showFilters)}>
                <FontAwesomeIcon icon={faFilter} className="mr-1" /> Filters
              </button>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-gray-600 text-sm">Sort by:</span>
                <select className="border-none text-sm font-medium text-gray-700 focus:outline-none bg-transparent" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:block w-64 pr-8">
              <div className="sticky top-24">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
                <Filters 
                  categories={categories}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  selectedRating={selectedRating}
                  handleRatingChange={handleRatingChange}
                  clearFilters={clearFilters}
                  renderStars={renderStars}
                />
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end" onClick={() => setShowFilters(false)}>
                <div className="bg-white w-4/5 max-w-sm h-full overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
                    <button onClick={() => setShowFilters(false)}><FontAwesomeIcon icon={faTimes} className="text-gray-500 text-xl" /></button>
                  </div>
                  <Filters 
                    categories={categories}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    selectedRating={selectedRating}
                    handleRatingChange={handleRatingChange}
                    clearFilters={clearFilters}
                    renderStars={renderStars}
                  />
                  <button onClick={() => setShowFilters(false)} className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium">Apply Filters</button>
                </div>
              </div>
            )}

            <div className="flex-1">
              {filteredAndSortedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isInWishlist={wishlist.includes(product.id)}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={handleToggleWishlist}
                        renderStars={renderStars}
                      />
                    ))}
                  </div>
                  <div className="mt-10 flex justify-center">
                    <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition duration-200 font-medium">Load More Products</button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 px-4">
                  <FontAwesomeIcon icon={faSearch} className="text-5xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
                  <p className="text-gray-500 mb-6">We couldn't find any products matching your criteria. Try adjusting your filters.</p>
                  <button onClick={clearFilters} className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200 font-medium">Clear All Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Are You an Artisan?</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Join our marketplace to showcase your handcrafted products to customers worldwide. Get started today and grow your business with us.
          </p>
          <button className="px-8 py-3 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition duration-200 font-medium text-lg">Register as an Artisan</button>
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">What Our Community Says</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4"><img src={customer1} alt="Testimonial" className="h-full w-full object-cover" /></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Anjali Sharma</h4>
                  <p className="text-sm text-gray-500">Happy Customer</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"I absolutely love the handwoven scarf I purchased! The craftsmanship is exceptional, and knowing that I'm supporting local artisans makes it even more special. The shipping was fast, and the packaging was beautiful."</p>
              <div className="flex items-center text-yellow-400 space-x-px">{renderStars(5)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4"><img src={customer2} alt="Testimonial" className="h-full w-full object-cover" /></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Vikram Mehta</h4>
                  <p className="text-sm text-gray-500">Artisan</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"As an artisan, this platform has completely transformed my business. I've been able to reach customers across the country and showcase my traditional woodworking skills. The support from the team has been incredible."</p>
              <div className="flex items-center text-yellow-400 space-x-px">{renderStars(5)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4"><img src={customer3} alt="Testimonial" className="h-full w-full object-cover" /></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Priya Patel</h4>
                  <p className="text-sm text-gray-500">Regular Shopper</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"I've been shopping here for over a year now, and I'm always impressed by the quality and uniqueness of the products. The brass pendant I bought gets so many compliments, and I love telling people about the artisan who made it."</p>
              <div className="flex items-center text-yellow-400 space-x-px">{renderStars(4.5)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          {/* ... footer content ... */}
        </div>
        <div className="border-t border-gray-700 py-6">
          <div className="container mx-auto px-4 text-center text-sm">
            <p>© 2025 DesiCrafts. All rights reserved. Designed with <FontAwesomeIcon icon={faHeart} className="text-red-500" /> for artisans.</p>
          </div>
        </div>
      </footer>

      {/* RENDER THE MODALS HERE */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        products={featuredProducts}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={featuredProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveToCart}
      />
    </div>
  );
};

export default App;
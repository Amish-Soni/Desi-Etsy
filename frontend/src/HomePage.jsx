// src/HomePage.jsx

import React, { useState, useMemo, useEffect } from "react";
import { Link } from 'react-router-dom'; // Import Link

// Component Imports
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import ArtisanCard from './components/ArtisanCard';

// Image Imports
import customer1 from './assets/c1.jpg';
import customer2 from './assets/c2.jpg';
import customer3 from './assets/c3.jpg';
import mainImage from './assets/p1.jpg';

// Icon Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faArrowRight, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

const INITIAL_PRODUCT_COUNT = 4;

const HomePage = ({
  allArtisans,
  allProducts,
  categories,
  wishlist,
  handleAddToCart,
  handleToggleWishlist,
  renderStars,
  searchQuery, // Receive search state from App.jsx
  setSearchQuery, // Receive setter from App.jsx
}) => {
  // --- LOCAL STATE FOR HOMEPAGE FILTERS AND DISPLAY ---
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [showAllArtisans, setShowAllArtisans] = useState(false);
  const [visibleProductCount, setVisibleProductCount] = useState(INITIAL_PRODUCT_COUNT);

  // --- DERIVED STATE (FILTERING AND SORTING) ---
  const filteredArtisans = useMemo(() => {
    if (!searchQuery) return allArtisans;
    const lowercasedQuery = searchQuery.toLowerCase();
    return allArtisans.filter(artisan =>
      artisan.name.toLowerCase().includes(lowercasedQuery) ||
      artisan.specialty.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, allArtisans]);

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts];
    if (searchQuery) { products = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.artisan.toLowerCase().includes(searchQuery.toLowerCase())); }
    if (selectedCategories.length > 0) { products = products.filter(p => selectedCategories.includes(p.categoryId)); }
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedRating) { products = products.filter(p => p.rating >= selectedRating); }
    // Sorting logic...
    switch (sortOption) {
        case 'price-low': products.sort((a, b) => a.price - b.price); break;
        case 'price-high': products.sort((a, b) => b.price - a.price); break;
        case 'rating': products.sort((a, b) => b.rating - a.rating); break;
        default: break;
    }
    return products;
  }, [searchQuery, selectedCategories, priceRange, selectedRating, sortOption, allProducts]);

  useEffect(() => {
    setVisibleProductCount(INITIAL_PRODUCT_COUNT);
  }, [searchQuery, selectedCategories, priceRange, selectedRating, sortOption]);

  const artisansToDisplay = showAllArtisans ? filteredArtisans : filteredArtisans.slice(0, 4);
  const productsToDisplay = filteredAndSortedProducts.slice(0, visibleProductCount);

  // --- LOCAL HANDLERS ---
  const handleViewAllArtisans = (e) => { e.preventDefault(); setShowAllArtisans(true); };
  const handleLoadMoreProducts = () => setVisibleProductCount(prev => prev + INITIAL_PRODUCT_COUNT);
  const handleRatingChange = (rating) => setSelectedRating(prev => (prev === rating ? null : rating));
  const clearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCategories([]);
    setSelectedRating(null);
    setSortOption("featured");
    setSearchQuery(""); // Also clear search
  };
  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
  };
  const handleNavClick = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] md:min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img src={mainImage} alt="Handcrafted marketplace" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Unique Handcrafted Treasures</h1>
            <p className="text-lg text-white/90 mb-8">Support local artisans and bring authentic handmade products directly to your doorstep.</p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button onClick={(e) => handleNavClick(e, 'shop')} className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200 font-medium">Shop Now</button>
              <Link to="/register-artisan" className="px-6 py-3 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition duration-200 font-medium flex items-center justify-center">Become an Artisan</Link>
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{showAllArtisans ? "All Our Artisans" : "Featured Artisans"}</h2>
                {!showAllArtisans && filteredArtisans.length > 4 && (
                <a href="#artisans" onClick={handleViewAllArtisans} className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">View All <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></a>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {artisansToDisplay.length > 0 ? (
                    artisansToDisplay.map((artisan) => <ArtisanCard key={artisan.id} artisan={artisan} renderStars={renderStars} />)
                ) : ( <div className="col-span-full text-center py-10 text-gray-500"><p>No artisans found matching your search.</p></div> )}
            </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="shop" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Our Products</h2>
                <div className="flex items-center self-end md:self-auto">
                    <button className="md:hidden mr-4 text-gray-700 border border-gray-300 px-3 py-1 rounded-full text-sm" onClick={() => setShowFilters(!showFilters)}><FontAwesomeIcon icon={faFilter} className="mr-1" /> Filters</button>
                    <div className="hidden md:flex items-center space-x-2">
                        <span className="text-gray-600 text-sm">Sort by:</span>
                        <select className="border-none text-sm font-medium text-gray-700 focus:outline-none bg-transparent" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="hidden md:block w-64 pr-8">
                    <div className="sticky top-24">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
                        <Filters categories={categories} priceRange={priceRange} setPriceRange={setPriceRange} selectedCategories={selectedCategories} toggleCategory={toggleCategory} selectedRating={selectedRating} handleRatingChange={handleRatingChange} clearFilters={clearFilters} renderStars={renderStars} />
                    </div>
                </div>
                {showFilters && (
                    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end" onClick={() => setShowFilters(false)}>
                        <div className="bg-white w-4/5 max-w-sm h-full overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-semibold text-gray-800">Filters</h3><button onClick={() => setShowFilters(false)}><FontAwesomeIcon icon={faTimes} className="text-gray-500 text-xl" /></button></div>
                            <Filters categories={categories} priceRange={priceRange} setPriceRange={setPriceRange} selectedCategories={selectedCategories} toggleCategory={toggleCategory} selectedRating={selectedRating} handleRatingChange={handleRatingChange} clearFilters={clearFilters} renderStars={renderStars} />
                            <button onClick={() => setShowFilters(false)} className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium">Apply Filters</button>
                        </div>
                    </div>
                )}
                <div className="flex-1">
                    {filteredAndSortedProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {productsToDisplay.map((product) => <ProductCard key={product.id} product={product} isInWishlist={wishlist.includes(product.id)} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} renderStars={renderStars} />)}
                            </div>
                            {visibleProductCount < filteredAndSortedProducts.length && (
                                <div className="mt-10 flex justify-center"><button onClick={handleLoadMoreProducts} className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition duration-200 font-medium">Load More Products</button></div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16 px-4"><FontAwesomeIcon icon={faSearch} className="text-5xl text-gray-300 mb-4" /><h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3><p className="text-gray-500 mb-6">We couldn't find any products matching your criteria. Try adjusting your filters.</p><button onClick={clearFilters} className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200 font-medium">Clear All Filters</button></div>
                    )}
                </div>
            </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Are You an Artisan?</h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-8">Join our marketplace to showcase your handcrafted products to customers worldwide. Get started today and grow your business with us.</p>
            <Link to="/register-artisan" className="px-8 py-3 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition duration-200 font-medium text-lg">Register as an Artisan</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">What Our Community Says</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4"><div className="h-12 w-12 rounded-full overflow-hidden mr-4"><img src={customer1} alt="Testimonial" className="h-full w-full object-cover" /></div><div><h4 className="font-semibold text-gray-800">Anjali Sharma</h4><p className="text-sm text-gray-500">Happy Customer</p></div></div>
                    <p className="text-gray-600 italic mb-4">"I absolutely love the handwoven scarf I purchased! The craftsmanship is exceptional, and knowing that I'm supporting local artisans makes it even more special."</p>
                    <div className="flex items-center text-yellow-400 space-x-px">{renderStars(5)}</div>
                </div>
                {/* Testimonial 2 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4"><div className="h-12 w-12 rounded-full overflow-hidden mr-4"><img src={customer2} alt="Testimonial" className="h-full w-full object-cover" /></div><div><h4 className="font-semibold text-gray-800">Vikram Mehta</h4><p className="text-sm text-gray-500">Artisan</p></div></div>
                    <p className="text-gray-600 italic mb-4">"As an artisan, this platform has completely transformed my business. I've been able to reach customers across the country and showcase my skills."</p>
                    <div className="flex items-center text-yellow-400 space-x-px">{renderStars(5)}</div>
                </div>
                {/* Testimonial 3 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4"><div className="h-12 w-12 rounded-full overflow-hidden mr-4"><img src={customer3} alt="Testimonial" className="h-full w-full object-cover" /></div><div><h4 className="font-semibold text-gray-800">Priya Patel</h4><p className="text-sm text-gray-500">Regular Shopper</p></div></div>
                    <p className="text-gray-600 italic mb-4">"I've been shopping here for over a year now, and I'm always impressed by the quality and uniqueness of the products. So many compliments!"</p>
                    <div className="flex items-center text-yellow-400 space-x-px">{renderStars(4.5)}</div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 py-12"></div>
        <div className="border-t border-gray-700 py-6">
            <div className="container mx-auto px-4 text-center text-sm"><p>© 2025 DesiCrafts. All rights reserved. Designed with <FontAwesomeIcon icon={faHeart} className="text-red-500" /> for artisans.</p></div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
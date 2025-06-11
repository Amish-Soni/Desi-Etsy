// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useMemo } from "react";
import AuthPage from './AuthPage'; 

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

// customer images 
import customer1 from './assets/c1.jpg';
import customer2 from './assets/c2.jpg';
import customer3 from './assets/c3.jpg';

// main image
import mainImage from './assets/p1.jpg';


// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faSearch,
  faHeart,
  faShoppingCart,
  faBars,
  faJar,
  faSocks,
  faGem,
  faTree,
  faPalette,
  faCouch,
  faArrowRight,
  faFilter,
  faTimes,
  faMapMarkerAlt,
  faStar,
  faStarHalfAlt,
  faEye,
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterest,
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faCcAmex
} from '@fortawesome/free-brands-svg-icons';

const App: React.FC = () => {
  // =================================================================
  // 1. ALL HOOKS CALLED UNCONDITIONALLY AT THE TOP
  // =================================================================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // =================================================================
  // 2. ALL DATA AND DERIVED STATE (useMemo) DEFINED NEXT
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

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...featuredProducts];

    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.artisan.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.categoryId));
    }
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedRating) {
      products = products.filter(p => p.rating >= selectedRating);
    }
    switch (sortOption) {
      case 'price-low': products.sort((a, b) => a.price - b.price); break;
      case 'price-high': products.sort((a, b) => b.price - a.price); break;
      case 'rating': products.sort((a, b) => b.rating - a.rating); break;
      case 'newest': products.sort((a, b) => b.id - a.id); break;
      case 'featured': default: products.sort((a, b) => a.id - b.id); break;
    }
    return products;
  }, [searchQuery, selectedCategories, priceRange, selectedRating, sortOption]);

  // =================================================================
  // 3. HANDLER FUNCTIONS AND HELPERS
  // =================================================================
  const handleLoginSuccess = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);
  
  const handleRatingChange = (rating: number) => {
    setSelectedRating(prev => (prev === rating ? null : rating));
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 200]);
    setSelectedCategories([]);
    setSelectedRating(null);
    setSortOption("featured");
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };
  
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false); 
  };

  const renderStars = (rating: number) => {
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
  
  const FiltersComponent = () => (
    <>
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="flex items-center justify-between text-sm mb-2 text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <input type="range" min="0" max="200" step="5" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} />
      </div>
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center mb-2">
            <input type="checkbox" id={`d-category-${category.id}`} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" checked={selectedCategories.includes(category.id)} onChange={() => toggleCategory(category.id)} />
            <label htmlFor={`d-category-${category.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">{category.name}</label>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Customer Rating</h4>
        {[4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center mb-2">
            <input type="radio" id={`d-rating-${rating}`} name="rating" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" checked={selectedRating === rating} onChange={() => handleRatingChange(rating)} />
            <label htmlFor={`d-rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center space-x-px cursor-pointer">
              {renderStars(rating)}
              <span className="ml-1 text-gray-600">& Up</span>
            </label>
          </div>
        ))}
      </div>
      <button onClick={clearFilters} className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200 font-medium text-sm">Clear All Filters</button>
    </>
  );

  // =================================================================
  // 4. CONDITIONAL RETURN FOR AUTHENTICATION
  // =================================================================
  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // =================================================================
  // 5. MAIN COMPONENT RENDER (if authenticated)
  // =================================================================
  const featuredArtisans = [
    { id: 1, name: "Maya Sharma", specialty: "Ceramic Pottery", location: "Jaipur, Rajasthan", image:artisan1, rating: 4.8 },
    { id: 2, name: "Ravi Patel", specialty: "Textile Weaving", location: "Ahmedabad, Gujarat", image:artisan2, rating: 4.6 },
    { id: 3, name: "Priya Verma", specialty: "Metal Jewelry", location: "Bhubaneswar, Odisha", image:artisan3, rating: 4.9 },
    { id: 4, name: "Anand Kumar", specialty: "Wood Carving", location: "Mysore, Karnataka", image:artisan4, rating: 4.7 },
  ];

  return (
    <div id="home" className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center">
              <FontAwesomeIcon icon={faStore} className="text-indigo-600 text-2xl mr-2" />
              <span className="text-xl md:text-2xl font-bold text-indigo-600">
                DesiCrafts
              </span>
            </a>
            <nav className="hidden md:flex ml-10 space-x-8">
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-gray-700 hover:text-indigo-600 font-medium">Home</a>
              <a href="#shop" onClick={(e) => handleNavClick(e, 'shop')} className="text-gray-700 hover:text-indigo-600 font-medium">Shop</a>
              <a href="#artisans" onClick={(e) => handleNavClick(e, 'artisans')} className="text-gray-700 hover:text-indigo-600 font-medium">Artisans</a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-gray-700 hover:text-indigo-600 font-medium">About</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-gray-700 hover:text-indigo-600 font-medium">Contact</a>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input type="text" placeholder="Search products..." className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-indigo-600"><FontAwesomeIcon icon={farHeart} className="text-xl" /></a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 relative">
                <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600"><FontAwesomeIcon icon={farUser} className="text-xl" /></a>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleLogout}
                className="px-4 py-2 flex items-center bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 font-medium text-sm">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
          
          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl w-6 h-6" />
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-lg z-20 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="flex flex-col p-4">
            <div className="relative mb-4">
              <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="py-2 text-gray-700 hover:text-indigo-600 font-medium">Home</a>
            <a href="#shop" onClick={(e) => handleNavClick(e, 'shop')} className="py-2 text-gray-700 hover:text-indigo-600 font-medium">Shop</a>
            <a href="#artisans" onClick={(e) => handleNavClick(e, 'artisans')} className="py-2 text-gray-700 hover:text-indigo-600 font-medium">Artisans</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="py-2 text-gray-700 hover:text-indigo-600 font-medium">About</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="py-2 text-gray-700 hover:text-indigo-600 font-medium">Contact</a>
            <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                <a href="#" className="text-gray-700 hover:text-indigo-600 mr-4"><FontAwesomeIcon icon={farHeart} className="text-xl" /></a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 relative mr-4">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </a>
                <a href="#" className="text-gray-700 hover:text-indigo-600"><FontAwesomeIcon icon={farUser} className="text-xl" /></a>
            </div>
            <div className="flex flex-col space-y-3 mt-4">
                <button 
                  onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 font-medium text-sm">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                </button>
            </div>
        </nav>
      </div>

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
              <div key={category.id} className="flex flex-col items-center cursor-pointer group" onClick={() => { toggleCategory(category.id); handleNavClick(new MouseEvent('click') as any, 'shop')}}>
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition duration-200">
                  <FontAwesomeIcon icon={category.icon} className="text-indigo-600 text-2xl" />
                </div>
                <span className="text-gray-700 font-medium group-hover:text-indigo-600 transition duration-200 text-center">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section id="artisans" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Artisans</h2>
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">View All <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtisans.map((artisan) => (
              <div key={artisan.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200 cursor-pointer">
                <div className="h-48 overflow-hidden"><img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover object-top" /></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{artisan.name}</h3>
                  <p className="text-indigo-600 font-medium text-sm mb-2">{artisan.specialty}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-3"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-gray-400" />{artisan.location}</div>
                  <div className="flex items-center">
                    <div className="flex items-center text-sm space-x-px">{renderStars(artisan.rating)}</div>
                    <span className="ml-2 text-sm text-gray-600">{artisan.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
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
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 pr-8">
              <div className="sticky top-24">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
                <FiltersComponent />
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
                  <FiltersComponent />
                  <button onClick={() => setShowFilters(false)} className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium">Apply Filters</button>
                </div>
              </div>
            )}

             {/* Products Grid */}
             <div className="flex-1">
              {filteredAndSortedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedProducts.map((product) => (
                      <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200 group">
                         <div className="relative h-64 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300" />
                          <div className="absolute top-2 right-2 flex flex-col space-y-2">
                            <button className="h-8 w-8 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:text-indigo-600 transition duration-200 cursor-pointer"><FontAwesomeIcon icon={farHeart} /></button>
                            <button className="h-8 w-8 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:text-indigo-600 transition duration-200 cursor-pointer"><FontAwesomeIcon icon={faEye} /></button>
                          </div>
                          {product.originalPrice && (<div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</div>)}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200 font-medium">Add to Cart</button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center text-sm text-gray-500 mb-1"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-gray-400" />{product.location}</div>
                          <h3 className="text-base font-semibold text-gray-800 mb-1 hover:text-indigo-600 transition duration-200 h-12 overflow-hidden">{product.name}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1">
                              <div className="flex items-center text-xs space-x-px">{renderStars(product.rating)}</div>
                              <span className="text-xs text-gray-600">({product.reviews})</span>
                            </div>
                            <div className="flex items-center">
                              {product.originalPrice && (<span className="text-xs text-gray-500 line-through mr-2">${product.originalPrice.toFixed(2)}</span>)}
                              <span className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faStore} className="text-indigo-400 text-2xl mr-2" />
                <span className="text-xl font-bold text-white">DesiCrafts</span>
              </div>
              <p className="mb-4">Connecting artisans with customers worldwide, preserving traditional crafts and supporting local communities.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-200"><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200"><FontAwesomeIcon icon={faPinterest} /></a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-white transition duration-200">Home</a></li>
                <li><a href="#shop" onClick={(e) => handleNavClick(e, 'shop')} className="hover:text-white transition duration-200">Shop</a></li>
                <li><a href="#artisans" onClick={(e) => handleNavClick(e, 'artisans')} className="hover:text-white transition duration-200">Artisans</a></li>
                <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition duration-200">About Us</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-white transition duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition duration-200">My Account</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
              <p className="mb-4">Subscribe to receive updates on new artisans, products, and exclusive offers.</p>
              <form className="mb-4">
                <div className="flex">
                  <input type="email" placeholder="Your email address" className="px-4 py-2 w-full rounded-l text-gray-800 text-sm border-none focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700 transition duration-200">Subscribe</button>
                </div>
              </form>
              <h3 className="text-lg font-semibold text-white mb-2">We Accept</h3>
              <div className="flex space-x-3">
                <FontAwesomeIcon icon={faCcVisa} className="text-2xl" />
                <FontAwesomeIcon icon={faCcMastercard} className="text-2xl" />
                <FontAwesomeIcon icon={faCcPaypal} className="text-2xl" />
                <FontAwesomeIcon icon={faCcAmex} className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 py-6">
          <div className="container mx-auto px-4 text-center text-sm">
            <p>© 2025 DesiCrafts. All rights reserved. Designed with <FontAwesomeIcon icon={faHeart} className="text-red-500" /> for artisans.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
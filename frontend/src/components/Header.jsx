import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faSearch, faShoppingCart, faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faUser as farUser } from '@fortawesome/free-regular-svg-icons';

const Header = ({
  searchQuery,
  setSearchQuery,
  totalCartItems,
  isMenuOpen,
  setIsMenuOpen,
  onLogout,
  onNavClick,
  onCartClick,
  onWishlistClick,
}) => {
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <a href="#home" onClick={(e) => onNavClick(e, 'home')} className="flex items-center">
              <FontAwesomeIcon icon={faStore} className="text-indigo-600 text-2xl mr-2" />
              <span className="text-xl md:text-2xl font-bold text-indigo-600">DesiCrafts</span>
            </a>
            <nav className="hidden md:flex ml-10 space-x-8">
              <a href="#home" onClick={(e) => onNavClick(e, 'home')} className="text-gray-700 hover:text-indigo-600 font-medium">Home</a>
              <a href="#shop" onClick={(e) => onNavClick(e, 'shop')} className="text-gray-700 hover:text-indigo-600 font-medium">Shop</a>
              <a href="#artisans" onClick={(e) => onNavClick(e, 'artisans')} className="text-gray-700 hover:text-indigo-600 font-medium">Artisans</a>
              <a href="#about" onClick={(e) => onNavClick(e, 'about')} className="text-gray-700 hover:text-indigo-600 font-medium">About</a>
              <a href="#contact" onClick={(e) => onNavClick(e, 'contact')} className="text-gray-700 hover:text-indigo-600 font-medium">Contact</a>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input type="text" placeholder="Search products..." className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={onWishlistClick} className="text-gray-700 hover:text-indigo-600">
                <FontAwesomeIcon icon={farHeart} className="text-xl" />
              </button>
              <button onClick={onCartClick} className="text-gray-700 hover:text-indigo-600 relative">
                <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </button>
              <a href="#" className="text-gray-700 hover:text-indigo-600"><FontAwesomeIcon icon={farUser} className="text-xl" /></a>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={onLogout} className="px-4 py-2 flex items-center bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 font-medium text-sm">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
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
            <a href="#home" onClick={(e) => onNavClick(e, 'home')} className="py-2 text-gray-700 hover:text-indigo-600 font-medium">Home</a>
            <a href="#shop" onClick={(e) => onNavClick(e, 'shop')} className="py-2 text-gray-700 hover:text-indigo-600 font-medium">Shop</a>
            <a href="#artisans" onClick={(e) => onNavClick(e, 'artisans')} className="py-2 text-gray-700 hover:text-indigo-600 font-medium">Artisans</a>
            <a href="#about" onClick={(e) => onNavClick(e, 'about')} className="py-2 text-gray-700 hover:text-indigo-600 font-medium">About</a>
            <a href="#contact" onClick={(e) => onNavClick(e, 'contact')} className="py-2 text-gray-700 hover:text-indigo-600 font-medium">Contact</a>
            <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                <button onClick={onWishlistClick} className="text-gray-700 hover:text-indigo-600 mr-4"><FontAwesomeIcon icon={farHeart} className="text-xl" /></button>
                <button onClick={onCartClick} className="text-gray-700 hover:text-indigo-600 relative mr-4">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                    {totalCartItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {totalCartItems}
                      </span>
                    )}
                </button>
                <a href="#" className="text-gray-700 hover:text-indigo-600"><FontAwesomeIcon icon={farUser} className="text-xl" /></a>
            </div>
            <div className="flex flex-col space-y-3 mt-4">
                <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full px-4 py-2 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 font-medium text-sm">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                </button>
            </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
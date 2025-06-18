import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMapMarkerAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const ProductCard = ({
  product,
  isInWishlist,
  onAddToCart,
  onToggleWishlist,
  renderStars,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200 group">
      <div className="relative h-64 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300" />
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button
            onClick={() => onToggleWishlist(product.id)}
            className={`h-8 w-8 rounded-full bg-white shadow flex items-center justify-center hover:text-indigo-600 transition duration-200 cursor-pointer ${ isInWishlist ? 'text-red-500' : 'text-gray-600' }`}
          >
            <FontAwesomeIcon icon={isInWishlist ? faHeart : farHeart} />
          </button>
          <button className="h-8 w-8 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:text-indigo-600 transition duration-200 cursor-pointer">
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button onClick={() => onAddToCart(product.id)} className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200 font-medium">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-gray-400" />
          {product.location}
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-1 hover:text-indigo-600 transition duration-200 h-12 overflow-hidden">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            <div className="flex items-center text-xs space-x-px">{renderStars(product.rating)}</div>
            <span className="text-xs text-gray-600">({product.reviews})</span>
          </div>
          <div className="flex items-center">
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through mr-2">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
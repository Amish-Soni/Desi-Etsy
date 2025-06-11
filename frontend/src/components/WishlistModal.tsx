import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: number[];
  products: Product[];
  onRemoveFromWishlist: (productId: number) => void;
  onMoveToCart: (productId: number) => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end" onClick={onClose}>
      <div className="bg-white w-full max-w-md h-full shadow-lg flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">My Wishlist</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-lg">Your wishlist is empty.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {wishlistProducts.map(product => (
                <li key={product.id} className="flex py-4 items-center">
                  <img src={product.image} alt={product.name} className="h-24 w-24 rounded-md object-cover" />
                  <div className="ml-4 flex-1">
                    <h3 className="text-base font-medium text-gray-800">{product.name}</h3>
                    <p className="text-indigo-600 font-semibold mt-1">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                     <button onClick={() => onMoveToCart(product.id)} className="px-3 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200">
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Move to Cart
                    </button>
                    <button onClick={() => onRemoveFromWishlist(product.id)} className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                      <FontAwesomeIcon icon={faTrash} className="mr-2" /> Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
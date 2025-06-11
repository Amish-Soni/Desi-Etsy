import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Product, CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  products: Product[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  products,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const getProductDetails = (productId: number) => {
    return products.find(p => p.id === productId);
  };

  const subtotal = cartItems.reduce((total, item) => {
    const product = getProductDetails(item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end" onClick={onClose}>
      <div className="bg-white w-full max-w-md h-full shadow-lg flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">My Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-lg">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => {
                const product = getProductDetails(item.productId);
                if (!product) return null;
                return (
                  <li key={item.productId} className="flex py-4">
                    <img src={product.image} alt={product.name} className="h-24 w-24 rounded-md object-cover" />
                    <div className="ml-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-800">{product.name}</h3>
                        <p className="text-indigo-600 font-semibold mt-1">${product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button onClick={() => onUpdateQuantity(product.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 text-gray-600 hover:bg-gray-100"><FontAwesomeIcon icon={faMinus} /></button>
                          <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(product.id, item.quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100"><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                        <button onClick={() => onRemoveItem(product.id)} className="text-red-500 hover:text-red-700">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-800">Subtotal</span>
              <span className="text-xl font-bold text-indigo-600">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
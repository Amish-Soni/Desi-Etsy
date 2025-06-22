import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItem, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const increment = (id, qty) => updateCartItem(id, qty + 1);
  const decrement = (id, qty) => {
    if (qty > 1) updateCartItem(id, qty - 1);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map(({ product, quantity }) => (
            <div key={product._id} className="cart-item">
              <img
                src={`data:${product.images[0]?.contentType};base64,${product.images[0]?.data}`}
                alt={product.name}
              />
              <div className="info">
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <div className="qty-controls">
                  <button onClick={() => decrement(product._id, quantity)}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => increment(product._id, quantity)}>
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(product._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button
              onClick={() => navigate("/checkout")}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

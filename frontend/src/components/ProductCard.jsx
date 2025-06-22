import React from "react";
import "../styles/ProductCard.css";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const image = product.images?.[0];

  return (
    <div className="product-card">
      {image ? (
        <img
          src={`data:${image.contentType};base64,${image.data}`}
          alt={product.name}
          className="product-img"
        />
      ) : (
        <div className="no-img">No Image</div>
      )}
      <div className="product-details">
        <h4>{product.name}</h4>
        <p className="price">₹{product.price}</p>
        <p className="artisan">By {product.artisan.name}</p>
        <button
          className="add-to-cart-btn"
          onClick={() => {
            addToCart(product._id);
            toast.success("Added to cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart");
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axiosInstance.post("/cart/add", { productId, quantity });
      await fetchCart();
      toast.success("Added to cart");
    } catch {
      toast.error("Add to cart failed");
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await axiosInstance.put("/cart/update", { productId, quantity });
      await fetchCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete("/cart/remove", { data: { productId } });
      await fetchCart();
    } catch {
      toast.error("Remove failed");
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete("/cart/clear");
      setCartItems([]);
    } catch {
      toast.error("Clear failed");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

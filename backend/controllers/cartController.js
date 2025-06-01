import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Get current user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const index = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Add to cart failed" });
  }
};

// Update quantity of cart item
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (index === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    cart.items[index].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ message: "Remove failed" });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

import Order from "../models/orderModel.js";

// Place new order
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, razorpayOrderId } = req.body;
    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      razorpayOrderId,
    });
    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
};

// Get user's order history
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    );
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Admin: update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("items.product");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

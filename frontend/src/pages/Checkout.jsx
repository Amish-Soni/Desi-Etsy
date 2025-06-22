import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create Razorpay order from backend
      const { data: razorpayOrder } = await axiosInstance.post(
        "/payment/create",
        { amount: totalAmount }
      );

      // 2. Open Razorpay popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Desi Etsy",
        description: "Handmade Product Purchase",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          // 3. Verify Payment
          await axiosInstance.post("/payment/verify", {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
          });

          // 4. Place Order
          const items = cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          }));

          await axiosInstance.post("/orders/place", {
            items,
            totalAmount,
            razorpayOrderId: razorpay_order_id,
          });

          clearCart();
          toast.success("Order placed successfully!");
          navigate("/my-orders");
        },
        theme: {
          color: "#c69c81",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // For testing purpose
      //   const items = cartItems.map((item) => ({
      //     product: item.product._id,
      //     quantity: item.quantity,
      //   }));

      //   await axiosInstance.post("/orders/place", {
      //     items,
      //     totalAmount,
      //     razorpayOrderId: "1",
      //   });

      //   clearCart();
      //   toast.success("Order placed successfully!");
      //   navigate("/my-orders");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Payment failed. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Total Amount: ₹{totalAmount}</p>
      <button
        className="checkout-btn"
        onClick={handlePayment}
        disabled={loading || cartItems.length === 0}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;

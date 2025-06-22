import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import "../styles/Admin.css";

const PendingProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/admin/pending-products");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products");
    }
  };

  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/admin/approve-product/${id}`);
      toast.success("Product approved");
      fetchProducts();
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosInstance.delete(`/admin/reject-product/${id}`);
      toast.success("Product rejected");
      fetchProducts();
    } catch {
      toast.error("Rejection failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-section">
      <h3>Pending Products</h3>
      {products.length === 0 ? (
        <p>No pending products.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <strong>{product.name}</strong> by {product.artisan.name} in{" "}
              {product.category.name}
              <br />
              <button onClick={() => handleApprove(product._id)}>
                Approve
              </button>
              <button
                onClick={() => handleReject(product._id)}
                className="danger"
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingProducts;

import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import "../styles/Admin.css";
import "../styles/Artisan.css";
import ProductImageCarousel from "../components/Artisan/ProductImageCarousel";

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
        <div className="product-list">
          {products.map((product) => (
            <div className="artisan-product-card" key={product._id}>
              <div className="carousel-container">
                {product.images?.length > 0 ? (
                  <ProductImageCarousel images={product.images} />
                ) : (
                  <div className="carousel-placeholder">No image available</div>
                )}
              </div>

              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>
                <strong>₹{product.price}</strong> | Stock: {product.stock}
              </p>
              <p>
                Category: <strong>{product.category?.name}</strong>
              </p>
              <p>
                Artisan: <strong>{product.artisan?.name}</strong>
              </p>

              <button onClick={() => handleApprove(product._id)}>
                Approve
              </button>
              <button
                onClick={() => handleReject(product._id)}
                className="delete-btn"
              >
                Reject
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingProducts;

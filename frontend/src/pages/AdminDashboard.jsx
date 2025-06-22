import React from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-links">
        <Link to="/admin/pending-artisans">Pending Artisans</Link>
        <Link to="/admin/pending-products">Pending Products</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

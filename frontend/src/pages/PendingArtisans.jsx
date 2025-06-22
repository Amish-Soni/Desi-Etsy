import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import "../styles/Admin.css";

const PendingArtisans = () => {
  const [artisans, setArtisans] = useState([]);

  const fetchArtisans = async () => {
    try {
      const res = await axiosInstance.get("/admin/pending-artisans");
      setArtisans(res.data);
    } catch {
      toast.error("Failed to load artisans");
    }
  };

  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/admin/approve-artisan/${id}`);
      toast.success("Artisan approved");
      fetchArtisans();
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosInstance.delete(`/admin/reject-artisan/${id}`);
      toast.success("Artisan rejected");
      fetchArtisans();
    } catch {
      toast.error("Rejection failed");
    }
  };

  useEffect(() => {
    fetchArtisans();
  }, []);

  return (
    <div className="admin-section">
      <h3>Pending Artisan Approvals</h3>
      {artisans.length === 0 ? (
        <p>No pending artisans.</p>
      ) : (
        <ul>
          {artisans.map((artisan) => (
            <li key={artisan._id}>
              <span>
                {artisan.name} ({artisan.email})
              </span>
              <button onClick={() => handleApprove(artisan._id)}>
                Approve
              </button>
              <button
                onClick={() => handleReject(artisan._id)}
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

export default PendingArtisans;

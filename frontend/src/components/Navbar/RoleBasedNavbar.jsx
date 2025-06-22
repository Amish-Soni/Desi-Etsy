import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import CustomerNavbar from "./CustomerNavbar";
import ArtisanNavbar from "./ArtisanNavbar";
import AdminNavbar from "./AdminNavbar";
import PublicNavbar from "./PublicNavbar";

const RoleBasedNavbar = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/public/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null); // not logged in
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <PublicNavbar />;
  if (user.role === "admin") return <AdminNavbar />;
  if (user.role === "artisan") return <ArtisanNavbar />;
  return <CustomerNavbar />;
};

export default RoleBasedNavbar;

import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/public/me"); // we'll need to create this
        setAuthUser(res.data.user);
      } catch (err) {
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

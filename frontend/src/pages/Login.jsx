import React, { useState } from "react";
import AuthForm from "../components/Auth/AuthForm";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      toast.success(res.data.message);

      const role = res.data.user?.role;

      if (role === "admin") {
        navigate("/admin/orders");
      } else if (role === "artisan") {
        navigate("/artisan/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <AuthForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isRegister={false}
      />

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Not registered yet?{" "}
        <Link
          to="/register"
          style={{ color: "#007bff", textDecoration: "underline" }}
        >
          Register here
        </Link>
      </p>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Want to become an Artisan?{" "}
        <Link
          to="/artisan/register"
          style={{ color: "#007bff", textDecoration: "underline" }}
        >
          Register as Artisan
        </Link>
      </p>
    </div>
  );
};

export default Login;

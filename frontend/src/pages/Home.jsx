import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ProductList from "../components/ProductList";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    artisan: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axiosInstance.get(`/products/approved?${queryParams}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <div className="home-container">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <ProductList products={products} />
    </div>
  );
};

export default Home;

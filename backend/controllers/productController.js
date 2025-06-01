import Product from "../models/productModel.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const artisanId = req.user._id;
    const newProduct = new Product({ ...req.body, artisan: artisanId });
    await newProduct.save();
    res.status(201).json({
      message: "Product created, pending admin approval",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating product" });
  }
};

// Get all products of logged-in artisan
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ artisan: req.user._id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, artisan: req.user._id },
      { ...req.body, isApproved: false }, // mark as pending re-approval
      { new: true }
    );
    res.status(200).json({ message: "Product updated", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({
      _id: req.params.id,
      artisan: req.user._id,
    });
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// Get all approved products (for customers)
export const getAllApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ approved: true }).populate(
      "category artisan"
    );
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

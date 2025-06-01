import User from "../models/userModel.js";
import Product from "../models/productModel.js";

// Get all artisan users pending approval
export const getPendingArtisans = async (req, res) => {
  try {
    const artisans = await User.find({ role: "artisan", isApproved: false });
    res.status(200).json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch artisans" });
  }
};

// Approve artisan
export const approveArtisan = async (req, res) => {
  const { artisanId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      artisanId,
      { isApproved: true },
      { new: true }
    );
    res.status(200).json({ message: "Artisan approved", user });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};

// Reject (or delete) artisan
export const rejectArtisan = async (req, res) => {
  const { artisanId } = req.params;
  try {
    await User.findByIdAndDelete(artisanId);
    res.status(200).json({ message: "Artisan rejected and removed" });
  } catch (err) {
    res.status(500).json({ message: "Rejection failed" });
  }
};

// Get all unapproved products
export const getPendingProducts = async (req, res) => {
  try {
    const pendingProducts = await Product.find({ isApproved: false }).populate(
      "artisan category"
    );
    res.status(200).json(pendingProducts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending products" });
  }
};

// Approve a product
export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    res.status(200).json({ message: "Product approved", product });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};

// Reject (delete) a product
export const rejectProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product rejected and deleted" });
  } catch (err) {
    res.status(500).json({ message: "Rejection failed" });
  }
};

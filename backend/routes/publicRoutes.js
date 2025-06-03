import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/approved-artisans", async (req, res) => {
  try {
    const artisans = await User.find({
      role: "artisan",
      isApproved: true,
    }).select("-password");
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

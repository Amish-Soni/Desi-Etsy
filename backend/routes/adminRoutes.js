import express from "express";
import {
  getPendingArtisans,
  approveArtisan,
  rejectArtisan,
  getPendingProducts,
  approveProduct,
  rejectProduct,
} from "../controllers/adminController.js";
import { requireAuth, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(requireAuth); // 🔐 All routes require auth
router.use(checkRole(["admin"])); // 🔐 Only admin access

// Artisan approval routes
router.get("/pending-artisans", getPendingArtisans);
router.put("/approve-artisan/:artisanId", approveArtisan);
router.delete("/reject-artisan/:artisanId", rejectArtisan);
// Product Approval
router.get("/pending-products", getPendingProducts);
router.put("/approve-product/:id", approveProduct);
router.delete("/reject-product/:id", rejectProduct);

export default router;

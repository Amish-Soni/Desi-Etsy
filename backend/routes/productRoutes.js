import express from "express";
import {
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getAllApprovedProducts,
} from "../controllers/productController.js";
import { requireAuth, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/approved", getAllApprovedProducts); // Public product listings

router.use(requireAuth);
router.use(checkRole(["artisan"]));

// Artisan-side Product Routes
router.post("/", createProduct);
router.get("/approved", getMyProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

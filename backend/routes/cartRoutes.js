import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

import { requireAuth, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);
router.use(checkRole(["user"])); // Only buyers

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove", removeFromCart);
router.delete("/clear", clearCart);

export default router;

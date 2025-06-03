import express from "express";
import {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { requireAuth, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

// Customer
router.post("/place", checkRole(["customer"]), placeOrder);
router.get("/my-orders", checkRole(["customer"]), getUserOrders);

// Admin
router.put("/update-status", checkRole(["admin"]), updateOrderStatus);

export default router;

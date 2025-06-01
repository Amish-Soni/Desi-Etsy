import express from "express";
import {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { requireAuth, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

// User
router.post("/place", checkRole(["user"]), placeOrder);
router.get("/my-orders", checkRole(["user"]), getUserOrders);

// Admin
router.put("/update-status", checkRole(["admin"]), updateOrderStatus);

export default router;

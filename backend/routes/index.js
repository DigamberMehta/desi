import express from "express";
import productRoutes from "./products.js";
import userRoutes from "./users.js";
import settingsRoutes from "./settings.js";
import couponRoutes from "./coupons.js";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/settings", settingsRoutes);
router.use("/coupons", couponRoutes);

export default router;

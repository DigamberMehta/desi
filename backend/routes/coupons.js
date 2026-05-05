import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { Coupon } from "../models/index.js";

const router = express.Router();

// GET /api/coupons - Get all coupons (Admin)
router.get("/", protect, admin, async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/coupons - Create a new coupon (Admin)
router.post("/", protect, admin, async (req, res) => {
  try {
    const { code, discountType, discountValue, isActive } = req.body;
    const couponExists = await Coupon.findOne({ code: code.toUpperCase() });

    if (couponExists) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon already exists" });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      isActive,
    });

    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/coupons/:id - Delete a coupon (Admin)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }
    res.json({ success: true, message: "Coupon removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/coupons/validate - Validate a coupon (Public)
router.post("/validate", async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid or inactive coupon" });
    }

    res.json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

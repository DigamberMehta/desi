import express from "express";
import Settings from "../models/Settings.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/settings - Get public settings
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/settings - Update settings (Admin only)
router.put("/", protect, admin, async (req, res) => {
  try {
    const update = {};
    if (req.body.whatsappNumber !== undefined) {
      update.whatsappNumber = req.body.whatsappNumber;
    }
    if (req.body.bannerUrls !== undefined) {
      update.bannerUrls = req.body.bannerUrls;
    }

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: update, $unset: { heroSlides: "" } },
      { upsert: true, new: true, runValidators: true },
    );

    res.json({
      success: true,
      data: settings,
      message: "Settings updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

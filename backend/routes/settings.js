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
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    if (req.body.whatsappNumber !== undefined) {
      settings.whatsappNumber = req.body.whatsappNumber;
    }
    if (req.body.bannerUrls !== undefined) {
      settings.bannerUrls = req.body.bannerUrls;
    }
    if (req.body.faqs !== undefined) {
      settings.faqs = req.body.faqs;
    }
    if (req.body.testimonials !== undefined) {
      settings.testimonials = req.body.testimonials;
    }

    await settings.save();
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

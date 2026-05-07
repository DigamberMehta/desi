import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Use memory storage — no temp files on disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ok =
      allowed.test(file.mimetype) &&
      allowed.test(file.originalname.toLowerCase());
    if (ok) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    // Configure Cloudinary here so dotenv has already loaded
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Upload buffer directly to Cloudinary via upload_stream
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "desi-products", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(req.file.buffer);
    });

    res.json({ success: true, url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res
      .status(500)
      .json({ success: false, message: err.message || "Upload failed" });
  }
});

export default router;

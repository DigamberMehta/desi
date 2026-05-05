import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// CRUD Routes
router.post("/", protect, admin, createProduct); // Create
router.get("/", getAllProducts); // Read All
router.get("/slug/:slug", getProductBySlug); // Read by Slug
router.get("/:id", getProductById); // Read by ID
router.put("/:id", protect, admin, updateProduct); // Update
router.delete("/:id", protect, admin, deleteProduct); // Delete

export default router;

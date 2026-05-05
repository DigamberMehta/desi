import express from "express";
import {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Auth Route
router.post("/login", loginUser);

// CRUD Routes
router.post("/", createUser); // Create
router.get("/", protect, admin, getAllUsers); // Read All
router.get("/:id", protect, admin, getUserById); // Read by ID
router.put("/:id", protect, updateUser); // Update
router.delete("/:id", protect, admin, deleteUser); // Delete

export default router;

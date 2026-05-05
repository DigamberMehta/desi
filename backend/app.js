// Backend Entry Point
// Initialize your Express app here

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import security from "./middleware/security.js";

// Load environment variables
dotenv.config();

const app = express();

// Security and performance middleware
app.use(security);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://desilocks.com", "https://www.desilocks.com"]
        : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);

// MongoDB Connection
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/desi-uae";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
import routes from "./routes/index.js";
app.use("/api", routes);

// Health check endpoint for monitoring
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Sitemap endpoint
app.get("/sitemap.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.sendFile("sitemap.xml", { root: "./public" });
});

// Robots.txt endpoint
app.get("/robots.txt", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.sendFile("robots.txt", { root: "./public" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

export default app;

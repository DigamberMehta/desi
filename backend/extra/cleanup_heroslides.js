import dotenv from "dotenv";
import mongoose from "mongoose";
import Settings from "../models/Settings.js";

dotenv.config();

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Check before
    const before = await Settings.findOne();
    console.log("Before:", {
      hasHeroSlides: !!before?.heroSlides,
      heroSlidesLength: before?.heroSlides?.length || 0,
      bannerUrlsLength: before?.bannerUrls?.length || 0,
    });

    // Remove heroSlides completely
    const result = await Settings.updateMany({}, { $unset: { heroSlides: 1 } });
    console.log("Update result:", result);

    // Check after
    const after = await Settings.findOne();
    console.log("After:", {
      hasHeroSlides: !!after?.heroSlides,
      bannerUrlsLength: after?.bannerUrls?.length || 0,
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

cleanup();

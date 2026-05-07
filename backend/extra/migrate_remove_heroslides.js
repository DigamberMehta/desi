import dotenv from "dotenv";
import mongoose from "mongoose";
import Settings from "../models/Settings.js";

dotenv.config();

const migrate = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Removing heroSlides from all Settings documents...");
    const result = await Settings.updateMany(
      {},
      { $unset: { heroSlides: "" } },
    );

    console.log(`✓ Migration complete!`);
    console.log(`  Matched: ${result.matchedCount}`);
    console.log(`  Modified: ${result.modifiedCount}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  }
};

migrate();

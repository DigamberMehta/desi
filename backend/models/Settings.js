import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    whatsappNumber: {
      type: String,
      default: "+971500000000",
    },
    bannerUrls: {
      type: [String],
      default: [],
    },
    faqs: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    testimonials: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
  },
  { timestamps: true },
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;

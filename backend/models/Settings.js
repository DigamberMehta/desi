import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    whatsappNumber: {
      type: String,
      default: "+971526187729",
    },
    bannerUrls: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;

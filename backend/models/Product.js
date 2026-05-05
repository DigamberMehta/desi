import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      en: {
        type: String,
        required: true,
      },
      ar: {
        type: String,
        required: true,
      },
    },
    description: {
      en: String,
      ar: String,
    },
    badge: {
      type: String,
      enum: ["NEW", "SALE", "BESTSELLER", null],
      default: null,
    },
    priceAED: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    gallery: [
      {
        type: String,
      },
    ],
    bullets: {
      en: [String],
      ar: [String],
    },
    category: {
      type: String,
      enum: ["smart-locks", "alarm-security", "accessories"],
      required: true,
    },
    specifications: {
      compatibility: String,
      cylinderType: String,
      battery: String,
      batteryLife: String,
      connectivity: String,
      encryption: String,
      voiceControl: String,
      operatingTemperature: String,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ratings: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    inTheBox: [String],
    featureHighlights: [
      {
        icon: String, // e.g., 'ScanFace', 'KeyRound'
        title: {
          en: String,
          ar: String,
        },
        desc: {
          en: String,
          ar: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  },
);

// Indexes
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;

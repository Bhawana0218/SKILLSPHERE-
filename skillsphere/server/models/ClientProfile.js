import mongoose from "mongoose";

const { Schema, model } = mongoose;

// 🔹 Project Schema
const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: String, // you can later convert to number range if needed
      required: true,
    },
    duration: {
      type: String, // e.g. "1 month", "2 weeks"
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

// 🔹 Client Profile Schema
const clientProfileSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    website: {
      type: String,
    },
    logo: {
      type: String, // store URL (Cloudinary / S3)
    },

    industry: {
      type: String,
    },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "200+"],
      default: "1-10",
    },

    location: {
      type: String,
    },

    hiringPreferences: {
      roles: [
        {
          type: String,
          trim: true,
        },
      ],
      projectTypes: [
        {
          type: String, // e.g. "One-time", "Long-term"
        },
      ],
      budgetRange: {
        type: String,
      },
    },

    projects: [projectSchema],

    // Optional but VERY useful for startup-level app
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("ClientProfile", clientProfileSchema);
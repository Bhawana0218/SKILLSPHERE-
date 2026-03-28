import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    profileViews: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    totalJobs: { type: Number, default: 0 },

    monthlyEarnings: [
      {
        month: String,
        amount: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String }, // 'gig', 'proposal', 'payment', 'review'
    message: { type: String },
    read: { type: Boolean, default: false },
    link: { type: String }, // Optional: link to job/proposal
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
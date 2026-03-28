import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    filedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    against: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    evidence: [{ type: String }], // file URLs
    status: { type: String, enum: ["Pending", "In Review", "Resolved"], default: "Pending" },
    resolution: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Dispute", disputeSchema);
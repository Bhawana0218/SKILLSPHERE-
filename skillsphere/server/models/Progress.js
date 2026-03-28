import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    milestone: { type: String, required: true },
    description: { type: String },
    files: [{ type: String }], // File URLs for milestone work
    completed: { type: Boolean, default: false },
    completionDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
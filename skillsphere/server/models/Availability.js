import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    isBooked: { type: Boolean, default: false },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Availability", availabilitySchema);
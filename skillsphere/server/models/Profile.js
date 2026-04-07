// models/Profile.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skills: [String],
  hourlyRate: { type: Number, default: 0 },
  bio: { type: String },
}, { timestamps: true });

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;

import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  company: String,
  avatar: String, 
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
}, { timestamps: true });

export default mongoose.model("Testimonial", testimonialSchema);
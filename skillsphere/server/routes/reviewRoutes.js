import express from "express";
import { addReview, getFreelancerReviews } from "../controllers/reviewController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Client adds review
router.post("/", protect, authorizeRoles("client"), addReview);

// Get reviews
router.get("/:freelancerId", getFreelancerReviews);

export default router;
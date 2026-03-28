import express from "express";
import { addMilestone, completeMilestone, getProgress } from "../controllers/progressController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Freelancer adds milestone
router.post("/", protect, authorizeRoles("freelancer"), addMilestone);

// Mark milestone complete
router.put("/:id/complete", protect, authorizeRoles("freelancer"), completeMilestone);

// Get progress for job
router.get("/:jobId", protect, getProgress);

export default router;
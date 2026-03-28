import express from "express";
import { getFreelancerAnalytics } from "../controllers/analyticsController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("freelancer"), getFreelancerAnalytics);

export default router;
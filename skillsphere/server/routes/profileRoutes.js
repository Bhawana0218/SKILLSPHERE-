import express from "express";
import { createOrUpdateProfile, getMyProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";
import { searchFreelancers } from "../controllers/profileController.js";

const router = express.Router();

router.post("/", protect, createOrUpdateProfile);
router.get("/me", protect, getMyProfile);
router.get("/search", searchFreelancers);

export default router;
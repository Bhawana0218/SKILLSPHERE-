import express from "express";
import { addAvailability, getAvailability, bookSlot } from "../controllers/availabilityController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Freelancer adds slots
router.post("/", protect, authorizeRoles("freelancer"), addAvailability);

// Get freelancer slots
router.get("/:freelancerId", protect, getAvailability);

// Client books a slot
router.post("/book", protect, authorizeRoles("client"), bookSlot);

export default router;
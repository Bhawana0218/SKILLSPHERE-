import express from "express";
import { fileDispute, resolveDispute, getAllDisputes, getUserDisputes } from "../controllers/disputeController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Client or Freelancer files dispute
router.post("/", protect, fileDispute);

// Get disputes for user
router.get("/me", protect, getUserDisputes);

// Admin resolves dispute
router.put("/:id/resolve", protect, authorizeRoles("admin"), resolveDispute);

// Admin views all disputes
router.get("/", protect, authorizeRoles("admin"), getAllDisputes);

export default router;
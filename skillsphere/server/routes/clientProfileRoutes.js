import express from "express";
import {
  createOrUpdateProfile,
  getMyProfile,
  addProject,
  updateProjectStatus,
  deleteProject,
  searchClients,
} from "../controllers/clientProfileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrUpdateProfile);
router.get("/me", protect, getMyProfile);
router.post("/project", protect, addProject);
router.patch("/project/:projectId", protect, updateProjectStatus);
router.delete("/project/:projectId", protect, deleteProject);
router.get("/search", searchClients);           

export default router;

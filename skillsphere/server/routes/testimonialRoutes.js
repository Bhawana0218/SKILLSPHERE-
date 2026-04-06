import express from "express";
import { getTestimonials, createTestimonial } from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", createTestimonial); 

export default router;
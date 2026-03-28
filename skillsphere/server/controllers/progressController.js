import Progress from "../models/Progress.js";
import { createNotification } from "./notificationController.js";

// Add milestone
export const addMilestone = async (req, res) => {
  const { jobId, milestone, description } = req.body;
  const files = req.files ? req.files.map(f => f.path) : [];

  const newProgress = await Progress.create({
    job: jobId,
    milestone,
    description,
    files,
  });

  // Notify client that milestone is added
  await createNotification(req.body.clientId, "milestone", `New milestone "${milestone}" added for your project.`, `/jobs/${jobId}`);

  res.status(201).json(newProgress);
};

// Mark milestone as complete
export const completeMilestone = async (req, res) => {
  const { id } = req.params;

  const progress = await Progress.findById(id);
  if (!progress) return res.status(404).json({ message: "Milestone not found" });

  progress.completed = true;
  progress.completionDate = new Date();
  await progress.save();

  // Notify client
  await createNotification(req.body.clientId, "milestone", `Milestone "${progress.milestone}" completed.`, `/jobs/${progress.job}`);

  res.json(progress);
};

// Get project progress
export const getProgress = async (req, res) => {
  const progress = await Progress.find({ job: req.params.jobId }).sort({ createdAt: 1 });
  res.json(progress);
};
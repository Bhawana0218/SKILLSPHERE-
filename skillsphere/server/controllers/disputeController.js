import Dispute from "../models/Dispute.js";
import { createNotification } from "./notificationController.js";

// File upload assumed via middleware (e.g., Multer)
export const fileDispute = async (req, res) => {
  try {
    const { jobId, againstId, description } = req.body;
    const evidence = req.files ? req.files.map(file => file.path) : [];

    const dispute = await Dispute.create({
      job: jobId,
      filedBy: req.user._id,
      against: againstId,
      description,
      evidence,
    });

    // Notify admin
    await createNotification(
      "ADMIN_ID", 
      "dispute", 
      `New dispute filed for job ${jobId}`, 
      `/admin/disputes/${dispute._id}`
    );

    res.status(201).json(dispute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin resolves dispute
export const resolveDispute = async (req, res) => {
  try {
    const { resolution } = req.body;
    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) return res.status(404).json({ message: "Dispute not found" });

    dispute.status = "Resolved";
    dispute.resolution = resolution;
    await dispute.save();

    // Notify both parties
    await createNotification(dispute.filedBy, "dispute", "Your dispute has been resolved", `/jobs/${dispute.job}`);
    await createNotification(dispute.against, "dispute", "Dispute involving you has been resolved", `/jobs/${dispute.job}`);

    res.json(dispute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get disputes (admin)
export const getAllDisputes = async (req, res) => {
  const disputes = await Dispute.find().populate("filedBy against job");
  res.json(disputes);
};

// Get disputes for a user
export const getUserDisputes = async (req, res) => {
  const disputes = await Dispute.find({ $or: [{ filedBy: req.user._id }, { against: req.user._id }] }).populate("filedBy against job");
  res.json(disputes);
};
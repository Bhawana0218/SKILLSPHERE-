import Availability from "../models/Availability.js";

// Add availability slot
export const addAvailability = async (req, res) => {
  const { startTime, endTime } = req.body;

  // Check for conflicts
  const conflict = await Availability.findOne({
    freelancer: req.user._id,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $lte: endTime, $gt: startTime } },
    ],
  });

  if (conflict) {
    return res.status(400).json({ message: "Time slot conflicts with existing availability" });
  }

  const slot = await Availability.create({
    freelancer: req.user._id,
    startTime,
    endTime,
  });

  res.status(201).json(slot);
};

// Get freelancer availability
export const getAvailability = async (req, res) => {
  const slots = await Availability.find({ freelancer: req.params.freelancerId }).sort({ startTime: 1 });
  res.json(slots);
};

// Book a slot
export const bookSlot = async (req, res) => {
  const { slotId, jobId } = req.body;

  const slot = await Availability.findById(slotId);
  if (!slot || slot.isBooked) {
    return res.status(400).json({ message: "Slot not available" });
  }

  slot.isBooked = true;
  slot.job = jobId;
  await slot.save();

  res.json({ success: true, slot });
};
import Notification from "../models/Notification.js";

// Create notification
export const createNotification = async (userId, type, message, link) => {
  const notification = await Notification.create({ user: userId, type, message, link });
  return notification;
};

// Get user notifications
export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
};

// Mark as read
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  await Notification.findByIdAndUpdate(id, { read: true });
  res.json({ success: true });
};

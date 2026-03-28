import Analytics from "../models/Analytics.js";
import Proposal from "../models/Proposal.js";
import Review from "../models/Review.js";

// GET DASHBOARD DATA
export const getFreelancerAnalytics = async (req, res) => {
  try {
    const freelancerId = req.user._id;

    // Total proposals
    const proposals = await Proposal.find({ freelancer: freelancerId });

    // Reviews
    const reviews = await Review.find({ freelancer: freelancerId });

    // Calculate avg rating
    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    // Earnings (you can later connect with payments)
    const totalEarnings = proposals
      .filter((p) => p.status === "accepted")
      .reduce((sum, p) => sum + p.bidAmount, 0);

    res.json({
      totalProposals: proposals.length,
      totalEarnings,
      avgRating,
      totalReviews: reviews.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
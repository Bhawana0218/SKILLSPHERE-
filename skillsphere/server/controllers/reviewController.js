import Review from "../models/Review.js";

// ADD REVIEW
export const addReview = async (req, res) => {
  try {
    const { jobId, freelancerId, rating, comment } = req.body;

    // Prevent duplicate review
    const existing = await Review.findOne({
      job: jobId,
      reviewer: req.user._id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already reviewed" });
    }

    const review = await Review.create({
      job: jobId,
      reviewer: req.user._id,
      freelancer: freelancerId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET FREELANCER REVIEWS
export const getFreelancerReviews = async (req, res) => {
  const reviews = await Review.find({
    freelancer: req.params.freelancerId,
  }).populate("reviewer", "name");

  res.json(reviews);
};
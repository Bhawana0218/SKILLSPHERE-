import Review from "../models/Review.js";
import Job from '../models/Job.js';



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



export const getFreelancerRating = async (req, res) => {
  try {
    const reviews = await Review.find({
      freelancer: req.params.freelancerId,
    });

    const totalReviews = reviews.length;

    const avgRating =
      totalReviews === 0
        ? 0
        : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    res.json({ avgRating, totalReviews });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import Job from "../models/Job.js";

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const { title, description, skillsRequired, budget, deadline } = req.body;

    const job = await Job.create({
      title,
      description,
      skillsRequired,
      budget,
      deadline,
      client: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL JOBS
export const getJobs = async (req, res) => {
  const jobs = await Job.find().populate("client", "name");
  res.json(jobs);
};

// GET SINGLE JOB
export const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id).populate("client", "name email");
  res.json(job);
};




// ADVANCED SEARCH
export const searchJobs = async (req, res) => {
  try {
    const { keyword, minBudget, maxBudget, skills } = req.query;

    let query = {};

    // Keyword search
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    // Budget filter
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = Number(minBudget);
      if (maxBudget) query.budget.$lte = Number(maxBudget);
    }

    // Skills filter
    if (skills) {
      query.skillsRequired = { $in: skills.split(",") };
    }

    const jobs = await Job.find(query).populate("client", "name");

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
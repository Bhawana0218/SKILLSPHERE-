// routes/profile.js
import express from "express";
import Freelancer from "../models/Freelancer.js";
import LegacyProfile from "../models/Profile.js";

const router = express.Router();

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildRateFilter = (minRate, maxRate) => {
  const rateFilter = {};

  if (minRate !== undefined && minRate !== "") {
    const parsedMinRate = Number(minRate);
    if (!Number.isNaN(parsedMinRate)) {
      rateFilter.$gte = parsedMinRate;
    }
  }

  if (maxRate !== undefined && maxRate !== "") {
    const parsedMaxRate = Number(maxRate);
    if (!Number.isNaN(parsedMaxRate)) {
      rateFilter.$lte = parsedMaxRate;
    }
  }

  return Object.keys(rateFilter).length ? rateFilter : undefined;
};

// GET /api/profile/search?skill=&minRate=&maxRate=
router.get("/search", async (req, res) => {
  const { skill = "", minRate, maxRate } = req.query;

  try {
    const skillValue = typeof skill === "string" ? skill.trim() : "";
    const rateFilter = buildRateFilter(minRate, maxRate);
    const safeSkill = skillValue ? escapeRegex(skillValue) : "";

    const freelancerQuery = {};
    const legacyQuery = {};

    if (safeSkill) {
      freelancerQuery["skills.name"] = { $regex: safeSkill, $options: "i" };
      legacyQuery.$or = [
        { skills: { $regex: safeSkill, $options: "i" } },
        { "skills.name": { $regex: safeSkill, $options: "i" } },
      ];
    }

    if (rateFilter) {
      freelancerQuery.hourlyRate = rateFilter;
      legacyQuery.hourlyRate = rateFilter;
    }

    const [freelancers, legacyProfiles] = await Promise.all([
      Freelancer.find(freelancerQuery).select("name title skills hourlyRate location"),
      LegacyProfile.find(legacyQuery).populate("user", "name email"),
    ]);

    const normalizedFreelancers = freelancers.map((freelancer) => ({
      _id: freelancer._id,
      hourlyRate: Number(freelancer.hourlyRate) || 0,
      title: freelancer.title || "",
      location: freelancer.location || "",
      skills: Array.isArray(freelancer.skills)
        ? freelancer.skills.map((entry) => entry?.name).filter(Boolean)
        : [],
      user: {
        name: freelancer.name || "Freelancer",
      },
    }));

    const normalizedLegacyProfiles = legacyProfiles.map((profile) => ({
      _id: profile._id,
      hourlyRate: Number(profile.hourlyRate) || 0,
      skills: Array.isArray(profile.skills)
        ? profile.skills
            .map((entry) => (typeof entry === "string" ? entry : entry?.name))
            .filter(Boolean)
        : [],
      user: {
        name: profile.user?.name || "Freelancer",
        email: profile.user?.email || "",
      },
    }));

    // Prevent browser revalidation for search responses to avoid stale UI states.
    res.set("Cache-Control", "no-store");
    res.status(200).json([...normalizedFreelancers, ...normalizedLegacyProfiles]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

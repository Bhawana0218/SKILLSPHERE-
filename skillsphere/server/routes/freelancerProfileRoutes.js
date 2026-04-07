import express from "express";
import Profile from "../models/FreelancerProfile.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get freelancer profile
router.get("/profile", protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      success: true,
      freelancer: {
        id: profile._id,
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        location: profile.location,
        hourlyRate: profile.hourlyRate,
        skills: profile.skills,
        experience: profile.experience,
        portfolio: profile.portfolio,
        certifications: profile.certifications,
        availability: profile.availability,
        pricing: profile.pricing,
        resumeUrl: profile.resumeUrl,
        profileComplete: profile.profileComplete,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create or update entire profile
router.post("/profile", protect, async (req, res) => {
  try {
    const {
      name,
      title,
      bio,
      location,
      hourlyRate,
      skills,
      experience,
      portfolio,
      certifications,
      availability,
      pricing,
      resumeUrl,
    } = req.body;

    // Check if profile exists
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update existing profile
      profile.name = name || profile.name;
      profile.title = title || profile.title;
      profile.bio = bio || profile.bio;
      profile.location = location || profile.location;
      profile.hourlyRate = hourlyRate !== undefined ? hourlyRate : profile.hourlyRate;
      profile.skills = skills || profile.skills;
      profile.experience = experience || profile.experience;
      profile.portfolio = portfolio || profile.portfolio;
      profile.certifications = certifications || profile.certifications;
      profile.availability = availability || profile.availability;
      profile.pricing = pricing || profile.pricing;
      profile.resumeUrl = resumeUrl || profile.resumeUrl;
      
      // Calculate profile completion
      profile.profileComplete = Boolean(
        profile.name &&
        profile.title &&
        profile.bio &&
        profile.hourlyRate &&
        profile.skills.length > 0 &&
        profile.experience.length > 0
      );
    } else {
      // Create new profile
      profile = new Profile({
        user: req.user.id,
        name,
        title,
        bio,
        location,
        hourlyRate,
        skills: skills || [],
        experience: experience || [],
        portfolio: portfolio || [],
        certifications: certifications || [],
        availability: availability || [],
        pricing: pricing || {},
        resumeUrl,
        profileComplete: Boolean(
          name && title && bio && hourlyRate && skills && skills.length > 0 &&
          experience && experience.length > 0
        ),
      });
    }

    await profile.save();

    res.json({
      success: true,
      message: "Profile saved successfully",
      freelancer: {
        id: profile._id,
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        location: profile.location,
        hourlyRate: profile.hourlyRate,
        skills: profile.skills,
        experience: profile.experience,
        portfolio: profile.portfolio,
        certifications: profile.certifications,
        availability: profile.availability,
        pricing: profile.pricing,
        resumeUrl: profile.resumeUrl,
        profileComplete: profile.profileComplete,
      },
    });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update skills
router.post("/profile/skills", protect, async (req, res) => {
  try {
    const { skills } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { skills },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ success: true, message: "Skills updated", skills: profile.skills });
  } catch (error) {
    console.error("Error updating skills:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update experience
router.post("/profile/experience", protect, async (req, res) => {
  try {
    const { experience } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { experience },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ success: true, message: "Experience updated", experience: profile.experience });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update portfolio
router.post("/profile/portfolio", protect, async (req, res) => {
  try {
    const { portfolio } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { portfolio },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ success: true, message: "Portfolio updated", portfolio: profile.portfolio });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update certifications
router.post("/profile/certifications", protect, async (req, res) => {
  try {
    const { certifications } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { certifications },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ success: true, message: "Certifications updated", certifications: profile.certifications });
  } catch (error) {
    console.error("Error updating certifications:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update availability
router.post("/profile/availability", protect, async (req, res) => {
  try {
    const { availability } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { availability },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ success: true, message: "Availability updated", availability: profile.availability });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update pricing
router.post("/profile/pricing", protect, async (req, res) => {
  try {
    const { pricing } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { pricing },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ success: true, message: "Pricing updated", pricing: profile.pricing });
  } catch (error) {
    console.error("Error updating pricing:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Refresh dashboard
router.put("/dashboard/refresh", protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ success: true, message: "Dashboard refreshed" });
  } catch (error) {
    console.error("Error refreshing dashboard:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

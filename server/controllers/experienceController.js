import Experience from '../models/Experience.js';

// @desc    Get all experience entries
// @route   GET /api/experience
// @access  Public
export const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single experience by ID
// @route   GET /api/experience/:id
// @access  Public
export const getExperienceById = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create experience entry
// @route   POST /api/experience
// @access  Private (Admin)
export const createExperience = async (req, res, next) => {
  try {
    const { jobTitle, company, startDate, endDate, description, achievements } = req.body;

    let formattedAchievements = achievements;
    if (typeof achievements === 'string') {
      try {
        formattedAchievements = JSON.parse(achievements);
      } catch {
        formattedAchievements = achievements.split('\n').map((a) => a.trim()).filter(Boolean);
      }
    }

    const experience = await Experience.create({
      jobTitle,
      company,
      startDate,
      endDate: endDate || 'Present',
      description,
      achievements: Array.isArray(formattedAchievements) ? formattedAchievements : [],
    });

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience entry
// @route   PUT /api/experience/:id
// @access  Private (Admin)
export const updateExperience = async (req, res, next) => {
  try {
    const updates = { ...req.body };

    if (updates.achievements && typeof updates.achievements === 'string') {
      try {
        updates.achievements = JSON.parse(updates.achievements);
      } catch {
        updates.achievements = updates.achievements.split('\n').map((a) => a.trim()).filter(Boolean);
      }
    }

    const experience = await Experience.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Experience updated successfully',
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience entry
// @route   DELETE /api/experience/:id
// @access  Private (Admin)
export const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found',
      });
    }

    await experience.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

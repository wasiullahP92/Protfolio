import Skill from '../models/Skill.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = {};

    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const skills = await Skill.find(query).sort({ category: 1, level: -1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private (Admin)
export const createSkill = async (req, res, next) => {
  try {
    const { name, category, level, icon } = req.body;

    const skill = await Skill.create({
      name,
      category,
      level: Number(level) || 80,
      icon: icon || 'Code2',
    });

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
export const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};


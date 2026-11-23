import Education from '../models/Education.js';

// @desc    Get all education entries
// @route   GET /api/education
// @access  Public
export const getEducations = async (req, res, next) => {
  try {
    const educations = await Education.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: educations.length,
      data: educations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single education entry by ID
// @route   GET /api/education/:id
// @access  Public
export const getEducationById = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education entry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create education entry
// @route   POST /api/education
// @access  Private (Admin)
export const createEducation = async (req, res, next) => {
  try {
    const { institution, degree, startDate, endDate, description } = req.body;

    const education = await Education.create({
      institution,
      degree,
      startDate: startDate || '',
      endDate: endDate || '',
      description,
    });

    res.status(201).json({
      success: true,
      message: 'Education entry created successfully',
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update education entry
// @route   PUT /api/education/:id
// @access  Private (Admin)
export const updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education entry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Education updated successfully',
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete education entry
// @route   DELETE /api/education/:id
// @access  Private (Admin)
export const deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education entry not found',
      });
    }

    await education.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Education deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};


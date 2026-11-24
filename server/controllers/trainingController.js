import Training from '../models/Training.js';

// @desc    Get all training entries
// @route   GET /api/trainings
// @access  Public
export const getTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: trainings.length,
      data: trainings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single training entry
// @route   GET /api/trainings/:id
// @access  Public
export const getTrainingById = async (req, res, next) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training record not found',
      });
    }
    res.status(200).json({
      success: true,
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new training entry
// @route   POST /api/trainings
// @access  Private (Admin)
export const createTraining = async (req, res, next) => {
  try {
    const {
      institute,
      course,
      status,
      currentFocus,
      description,
      startDate,
      endDate,
      highlights,
    } = req.body;

    if (!institute || !course) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both institute and course name',
      });
    }

    const training = await Training.create({
      institute: institute.trim(),
      course: course.trim(),
      status: status ? status.trim() : 'Currently Learning',
      currentFocus: currentFocus ? currentFocus.trim() : 'React.js',
      description: description ? description.trim() : '',
      startDate: startDate ? startDate.trim() : '',
      endDate: endDate ? endDate.trim() : 'Present',
      highlights: Array.isArray(highlights)
        ? highlights
        : typeof highlights === 'string'
        ? highlights.split(',').map((h) => h.trim()).filter(Boolean)
        : [],
    });

    res.status(201).json({
      success: true,
      message: 'Training record created successfully',
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update training entry
// @route   PUT /api/trainings/:id
// @access  Private (Admin)
export const updateTraining = async (req, res, next) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training record not found',
      });
    }

    const fields = [
      'institute',
      'course',
      'status',
      'currentFocus',
      'description',
      'startDate',
      'endDate',
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        training[field] = req.body[field];
      }
    });

    if (req.body.highlights !== undefined) {
      training.highlights = Array.isArray(req.body.highlights)
        ? req.body.highlights
        : typeof req.body.highlights === 'string'
        ? req.body.highlights.split(',').map((h) => h.trim()).filter(Boolean)
        : [];
    }

    const updated = await training.save();

    res.status(200).json({
      success: true,
      message: 'Training record updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete training entry
// @route   DELETE /api/trainings/:id
// @access  Private (Admin)
export const deleteTraining = async (req, res, next) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training record not found',
      });
    }

    await training.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Training record deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to remove local uploaded file
const deleteLocalFile = (imagePath) => {
  if (imagePath && imagePath.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, '..', imagePath);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Failed to delete obsolete image:', err.message);
      }
    }
  }
};

// @desc    Get all projects (with filtering)
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const projects = await Project.find(query).sort({ featured: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by ID or Slug
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let project;
    // Check if param is valid MongoDB ObjectId or slug
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(id);
    } else {
      project = await Project.findOne({ slug: id });
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project not found with identifier: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new project (with image upload)
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res, next) => {
  try {
    let {
      title,
      slug,
      shortDescription,
      fullDescription,
      technologies,
      category,
      liveUrl,
      githubUrl,
      featured,
      image,
    } = req.body;

    // If an image file was uploaded via Multer
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Project image is required (upload a file or provide an image URL)',
      });
    }

    // Format technologies if sent as JSON string or comma-separated list
    let formattedTech = technologies;
    if (typeof technologies === 'string') {
      try {
        formattedTech = JSON.parse(technologies);
      } catch {
        formattedTech = technologies.split(',').map((t) => t.trim()).filter(Boolean);
      }
    }

    const newProject = await Project.create({
      title,
      slug,
      shortDescription,
      fullDescription,
      image,
      technologies: formattedTech,
      category,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      featured: featured === true || featured === 'true',
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
    });
  } catch (error) {
    // If multer stored a file but DB validation failed, clean up the file
    if (req.file) {
      deleteLocalFile(`/uploads/${req.file.filename}`);
    }
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      if (req.file) deleteLocalFile(`/uploads/${req.file.filename}`);
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const updates = { ...req.body };

    // Format technologies if passed
    if (updates.technologies) {
      if (typeof updates.technologies === 'string') {
        try {
          updates.technologies = JSON.parse(updates.technologies);
        } catch {
          updates.technologies = updates.technologies.split(',').map((t) => t.trim()).filter(Boolean);
        }
      }
    }

    // Handle uploaded file replacement
    if (req.file) {
      const oldImage = project.image;
      updates.image = `/uploads/${req.file.filename}`;
      // Delete previous local image if it was replaced
      deleteLocalFile(oldImage);
    }

    if (updates.featured !== undefined) {
      updates.featured = updates.featured === true || updates.featured === 'true';
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error) {
    if (req.file) deleteLocalFile(`/uploads/${req.file.filename}`);
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    deleteLocalFile(project.image);
    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};


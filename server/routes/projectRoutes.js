import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadProjectImage } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, uploadProjectImage.single('image'), createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, uploadProjectImage.single('image'), updateProject)
  .delete(protect, deleteProject);

export default router;


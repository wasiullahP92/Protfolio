import express from 'express';
import {
  getTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
} from '../controllers/trainingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getTrainings).post(protect, createTraining);
router.route('/:id').get(getTrainingById).put(protect, updateTraining).delete(protect, deleteTraining);

export default router;

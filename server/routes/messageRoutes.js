import express from 'express';
import {
  getMessages,
  createMessage,
  markMessageRead,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getMessages)
  .post(createMessage);

router.route('/:id')
  .delete(protect, deleteMessage);

router.route('/:id/read')
  .put(protect, markMessageRead);

export default router;

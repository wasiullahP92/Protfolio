import express from 'express';
import {
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
  updateAdminProfile,
  updateAdminPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/me', protect, getAdminProfile);
router.post('/logout', logoutAdmin);
router.put('/profile', protect, updateAdminProfile);
router.put('/password', protect, updateAdminPassword);

export default router;


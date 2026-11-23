import express from 'express';
import { loginAdmin, getAdminProfile, logoutAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/me', protect, getAdminProfile);
router.post('/logout', logoutAdmin);

export default router;

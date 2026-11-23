import Admin from '../models/Admin.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Authenticate admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Find admin by email and explicitly select password
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password match
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: 'Admin authenticated successfully',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in admin profile
// @route   GET /api/auth/me
// @access  Private (Admin)
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin logout
// @route   POST /api/auth/logout
// @access  Public / Client-side token discard
export const logoutAdmin = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully. Token discarded on client.',
  });
};

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

// @desc    Get public profile for website (name, intro, current learning, future goals)
// @route   GET /api/auth/profile-public
// @access  Public
export const getPublicProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(200).json({
        success: true,
        profile: {
          name: 'Wasi Ullah',
          email: 'wasiwebsolution@gmail.com',
          professionalTitle: 'WordPress Developer | Web Designer | Full Stack Developer in Progress',
          location: 'Peshawar, Pakistan',
          shortIntro:
            "Hi, I'm Wasi Ullah, a passionate web developer and Computer Science student. I specialize in WordPress website design and development. I am continuously improving my development skills and exploring modern web technologies. Currently, I am learning React.js to build dynamic, interactive, and modern web applications.",
          currentLearningTech: 'React.js',
          futureGoals: [
            'Advanced React.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Full-Stack Development',
          ],
        },
      });
    }

    res.status(200).json({
      success: true,
      profile: {
        name: admin.name,
        email: admin.email,
        professionalTitle: admin.professionalTitle,
        location: admin.location,
        shortIntro: admin.shortIntro,
        currentLearningTech: admin.currentLearningTech,
        futureGoals: admin.futureGoals,
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
        professionalTitle: admin.professionalTitle,
        location: admin.location,
        shortIntro: admin.shortIntro,
        currentLearningTech: admin.currentLearningTech,
        futureGoals: admin.futureGoals,
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

// @desc    Update admin profile (name, email, titles, intros, learning goals)
// @route   PUT /api/auth/profile
// @access  Private (Admin)
export const updateAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    if (req.body.name) admin.name = req.body.name.trim();
    if (req.body.email) admin.email = req.body.email.toLowerCase().trim();
    if (req.body.professionalTitle) admin.professionalTitle = req.body.professionalTitle.trim();
    if (req.body.location) admin.location = req.body.location.trim();
    if (req.body.shortIntro) admin.shortIntro = req.body.shortIntro.trim();
    if (req.body.currentLearningTech) admin.currentLearningTech = req.body.currentLearningTech.trim();
    if (req.body.futureGoals) {
      admin.futureGoals = Array.isArray(req.body.futureGoals)
        ? req.body.futureGoals
        : typeof req.body.futureGoals === 'string'
        ? req.body.futureGoals.split(',').map((g) => g.trim()).filter(Boolean)
        : admin.futureGoals;
    }

    const updatedAdmin = await admin.save();

    res.status(200).json({
      success: true,
      message: 'Admin profile updated successfully',
      admin: {
        id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        professionalTitle: updatedAdmin.professionalTitle,
        location: updatedAdmin.location,
        shortIntro: updatedAdmin.shortIntro,
        currentLearningTech: updatedAdmin.currentLearningTech,
        futureGoals: updatedAdmin.futureGoals,
        createdAt: updatedAdmin.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin password
// @route   PUT /api/auth/password
// @access  Private (Admin)
export const updateAdminPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new passwords',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long',
      });
    }

    const admin = await Admin.findById(req.admin._id).select('+password');

    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};


import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
      default: 'Wasi Ullah',
    },
    email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Admin password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Do not return password by default
    },
    professionalTitle: {
      type: String,
      trim: true,
      default: 'WordPress Developer | Web Designer | Full Stack Developer in Progress',
    },
    location: {
      type: String,
      trim: true,
      default: 'Peshawar, Pakistan',
    },
    shortIntro: {
      type: String,
      trim: true,
      default:
        "Hi, I'm Wasi Ullah, a passionate web developer and Computer Science student. I specialize in WordPress website design and development. I am continuously improving my development skills and exploring modern web technologies. Currently, I am learning React.js to build dynamic, interactive, and modern web applications.",
    },
    currentLearningTech: {
      type: String,
      trim: true,
      default: 'React.js',
    },
    futureGoals: {
      type: [String],
      default: [
        'Advanced React.js',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Full-Stack Development',
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password in database
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;

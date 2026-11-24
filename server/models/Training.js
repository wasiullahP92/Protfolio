import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema(
  {
    institute: {
      type: String,
      required: [true, 'Institute name is required'],
      trim: true,
      default: 'Saylani IT Mass Training Program (Saylani IT)',
    },
    course: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      default: 'Modern Web Development',
    },
    status: {
      type: String,
      trim: true,
      default: 'Currently Learning',
    },
    currentFocus: {
      type: String,
      trim: true,
      default: 'React.js',
    },
    description: {
      type: String,
      trim: true,
      default:
        'Professional training program in modern web development covering frontend foundations, advanced JavaScript, and interactive single-page application development with React.js.',
    },
    startDate: {
      type: String,
      trim: true,
      default: '2024',
    },
    endDate: {
      type: String,
      trim: true,
      default: 'Present',
    },
    highlights: {
      type: [String],
      default: [
        'Modern Web Standards (HTML5 & CSS3)',
        'JavaScript (ES6+) Logic & DOM',
        'React.js Component Architecture & Hooks',
        'Single Page Applications (SPAs)',
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

const Training = mongoose.model('Training', trainingSchema);
export default Training;


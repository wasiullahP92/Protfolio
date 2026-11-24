import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree / qualification name is required'],
      trim: true,
    },
    startDate: {
      type: String,
      trim: true,
      default: '',
    },
    endDate: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      trim: true,
      default: 'Completed', // e.g. "Currently Studying" or "Completed"
    },
    location: {
      type: String,
      trim: true,
      default: 'Peshawar, Pakistan',
    },
    field: {
      type: String,
      trim: true,
      default: 'Computer Science',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
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

const Education = mongoose.model('Education', educationSchema);
export default Education;

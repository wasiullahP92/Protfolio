import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      trim: true,
    },
    level: {
      type: Number,
      required: [true, 'Skill level is required'],
      min: [0, 'Skill level cannot be less than 0'],
      max: [100, 'Skill level cannot be greater than 100'],
      default: 80,
    },
    icon: {
      type: String,
      default: 'Code2',
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

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;


import mongoose from 'mongoose';

const patternSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Easy', 'Intermediate', 'Advanced', 'Expert']
  },
  category: {
    type: String,
    required: true,
    enum: ['Clothing', 'Accessories', 'Home Decor', 'Toys', 'Blankets', 'Other']
  },
  hookSize: {
    type: String,
    required: true
  },
  materials: [{
    type: String,
    required: true
  }],
  isFree: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Pattern', patternSchema);

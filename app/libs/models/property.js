import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true
  },
  price: {
    type: String,
    required: [true, 'Please provide a price'],
    trim: true
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please provide number of bedrooms'],
    min: 0
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please provide number of bathrooms'],
    min: 0
  },
  area: {
    type: String,
    required: [true, 'Please provide the area'],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);


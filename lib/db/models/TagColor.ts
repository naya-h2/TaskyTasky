import mongoose from 'mongoose';

const tagColorSchema = new mongoose.Schema({
  tagName: { type: String, default: '' },
  colorID: { type: Number, default: 0 },
});

const TagColor = mongoose.models['TagColor'] || mongoose.model('TagColor', tagColorSchema);

export default TagColor;

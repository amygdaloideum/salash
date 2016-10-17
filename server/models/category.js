import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Category', categorySchema);

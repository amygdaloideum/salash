import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: { type: 'String', required: true },
  title: { type: 'String', required: true },
  plural: { type: 'String', required: true },
});

export default mongoose.model('Category', categorySchema);

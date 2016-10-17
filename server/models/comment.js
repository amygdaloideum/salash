import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: 'String', required: true },
  likes: { type: 'Number', required: false },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Comment', commentSchema);

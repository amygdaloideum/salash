import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: 'String', required: true },
  description: { type: 'String', required: true },
  instructions: { type: 'String', required: true },
  imageUrl: { type: 'String' },
  cuid: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  ingredients: [{
    ingredient: { type: 'String'},
    amount: { type: 'String' }
  }],
  categories: [{ type: 'String', ref: 'Category' }],
  likes: { type: 'Number', required: false, default: 0 },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  dateAdded: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Recipe', recipeSchema);

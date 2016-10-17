import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: 'String', required: true },
  description: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  likes: { type: 'Number', required: false },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  dateAdded: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Recipe', recipeSchema);

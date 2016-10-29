import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  _id: { type: String, required: true },
  singular: { type: 'String', required: true },
  plural: { type: 'String', required: true },
});

export default mongoose.model('Ingredient', ingredientSchema);

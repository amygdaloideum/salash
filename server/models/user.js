import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: { type: 'String', required: true },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String
  }
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

export default mongoose.model('User', userSchema);

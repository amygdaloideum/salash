import Ingredient from '../models/ingredient';
import cuid from 'cuid';
import slug from 'limax';

/**
 * Get all ingredients
 * @param req
 * @param res
 * @returns void
 */
export function getIngredients(req, res) {
  Ingredient.find().exec((err, Ingredients) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ Ingredients });
  });
}

export function getIngredientsByTitle(req, res) {
  Ingredient.find({ "title": new RegExp(req.params.title, "i") }).exec((err, ingredients) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ ingredients });
  });
}
